// Neural Workflow Engine - Orchestrator
// Handles multi-step plan generation, approval gates, and execution via MCP Tools.

const API_BASE = (import.meta as any).env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

// --- Types ---

export interface MCPTool {
    server: string; // e.g., 'github', 'stripe'
    name: string;   // e.g., 'create_issue'
    args: Record<string, any>; // Not fully used in backend MVP yet, but kept for future
}

export type StepStatus = 'pending' | 'approved' | 'executing' | 'completed' | 'failed' | 'skipped';

export interface Step {
    id: number;
    description: string;
    tool: MCPTool;
    status: StepStatus;
    result?: any;
    requiresApproval: boolean; // True for write ops
    input_description?: string;
}

export interface Plan {
    id: string;
    description: string;
    workflow_name?: string;
    steps: Step[];
    status: 'draft' | 'awaiting_approval' | 'approved' | 'executing' | 'completed' | 'failed';
}

// --- Constants ---
const WRITE_TOOLS = ['stripe', 'gmail', 'slack', 'github', 'linear', 'postgres', 'email', 'code', 'devops'];
// Note: This list should ideally be dynamic based on tool capabilities.

// --- Orchestrator Logic ---

export class NeuralOrchestrator {
    private currentPlan: Plan | null = null;

    constructor() {
        console.log("NeuralOrchestrator Initialized (Connected to Backend)");
    }

    /**
     * Stage 1: Generate a Plan from a Goal using LLM via Backend
     */
    async generatePlan(goal: string): Promise<Plan> {
        console.log(`Analyzing Goal: ${goal}`);

        try {
            const response = await fetch(`${API_BASE}/api/plan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: goal })
            });

            if (!response.ok) {
                throw new Error(`Plan generation failed: ${response.statusText}`);
            }

            const data = await response.json();

            // Map backend response to logic Step structure
            const steps: Step[] = data.steps.map((s: any) => {
                // Parse tool string "server.method" -> { server, name }
                const [server, name] = s.tool.includes('.') ? s.tool.split('.') : ['system', s.tool];

                return {
                    id: s.id,
                    description: s.action,
                    tool: { server, name, args: {} },
                    status: 'pending',
                    requiresApproval: WRITE_TOOLS.includes(server) || false,
                    input_description: s.input_description
                };
            });

            this.currentPlan = {
                id: data.workflow_id,
                description: goal,
                workflow_name: data.workflow_name,
                steps: steps,
                status: 'draft'
            };

            return this.currentPlan;

        } catch (error) {
            console.error("Orchestrator Plan Error:", error);
            throw error;
        }
    }

    /**
     * Stage 2: Request Approval
     * Pauses execution and returns the plan for UI rendering.
     */
    requestApproval(): Plan {
        if (!this.currentPlan) throw new Error("No plan to approve");

        // Mark write steps as needing explicit approval if not already
        this.currentPlan.steps.forEach(step => {
            if (WRITE_TOOLS.includes(step.tool.server)) {
                step.requiresApproval = true;
            }
        });

        this.currentPlan.status = 'awaiting_approval';
        return this.currentPlan;
    }

    /**
     * Stage 3: Human Feedback Loop
     * User approves or rejects the plan.
     */
    async handleApproval(approved: boolean, feedback?: string): Promise<Plan> {
        if (!this.currentPlan) throw new Error("No plan active");

        if (approved) {
            this.currentPlan.status = 'approved';
            console.log("Plan Approved. Executing...");
            await this.executePlan();
        } else {
            console.log(`Plan Rejected. Feedback: ${feedback}`);
            this.currentPlan.status = 'draft';
        }

        return this.currentPlan;
    }

    /**
     * Stage 4: Execution via Backend
     * Iterates through steps.
     */
    private async executePlan() {
        if (!this.currentPlan) return;

        this.currentPlan.status = 'executing';

        for (const step of this.currentPlan.steps) {
            if (step.status === 'completed') continue;

            step.status = 'executing';
            console.log(`[EXEC] Step ${step.id}: ${step.description}`);

            try {
                const response = await fetch(`${API_BASE}/api/execute-step`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        workflow_id: this.currentPlan.id,
                        step_id: step.id,
                        tool: `${step.tool.server}.${step.tool.name}`,
                        action: step.description,
                        context: this.currentPlan.description // Pass original prompt as context
                    })
                });

                if (!response.ok) {
                    throw new Error(`Step execution failed: ${response.statusText}`);
                }

                const result = await response.json();

                if (result.status === 'completed') {
                    step.status = 'completed';
                    step.result = result.output;
                } else {
                    throw new Error(result.error || 'Unknown step failure');
                }

            } catch (error: any) {
                console.error(`[FAIL] Step ${step.id} failed:`, error);
                step.status = 'failed';
                step.result = error.message;
                this.currentPlan.status = 'failed';
                break; // Stop execution on failure
            }

            // Small delay to allow UI updates and prevent rate limiting
            await new Promise(r => setTimeout(r, 500));
        }

        if (this.currentPlan.status !== 'failed') {
            this.currentPlan.status = 'completed';
        }
    }

    /**
     * Getter for UI to poll state
     */
    getPlanState(): Plan | null {
        return this.currentPlan;
    }
}
