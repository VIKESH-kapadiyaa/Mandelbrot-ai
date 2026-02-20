---
artifact_type: implementation_plan
title: "Neural Workflow Engine Implementation Plan"
status: "draft"
---

## 1. Objective
Implement a robust Neural Workflow Engine that uses the Model Context Protocol (MCP) to execute multi-step tasks using 10 core tools. The engine will feature a Human-in-the-Loop approval mechanism and a "Mission Control Dashboard" integrated into the existing frontend.

## 2. Architecture Overview
- **MCP Host Configuration**: A standard `mcp_config.json` file in the project root to define tool servers.
- **Orchestration Layer**: A TypeScript-based orchestrator (`src/lib/engine/orchestrator.ts`) designed to run in a Node.js context (or compatible runtime) to manage tool execution, state, and human approval gates.
- **Frontend Integration**: A new Dashboard at `/work/neural-engine` built with React/Vite, inheriting the "Neon Glass" theme.

## 3. Implementation Steps

### Phase 1: Tool Manifest Initialization (MCP Config)
- **Action**: Create `mcp_config.json` in project root.
- **Content**: Define the 10 core tools using `uvx` (where applicable) and local command execution.
  - Google Drive, GitHub, Slack, Stripe, Gmail, Postgres, Brave Search, Linear, Puppeteer, Local Shell.
- **Constraint**: Ensure `uvx` commands are correctly formatted for the MCP host.

### Phase 2: Engine Logic (Orchestrator)
- **Action**: Create `src/lib/engine/orchestrator.ts`.
- **Key Components**:
  - `class NeuralOrchestrator`: Manages workflow state (Planning -> Approval -> Execution).
  - `interface MCPTool`: Defines the structure for tool calls.
  - `generatePlan(goal: string)`: Uses an LLM (via OpenRouter/Groq) to break down goals into steps.
  - `requestApproval(plan: Plan)`: Pauses execution and returns a "Pending Approval" state to the UI.
  - `executeStep(step: Step)`: Calls the specific MCP tool after approval.
- **Safety**: Implement a strict "Read-Only" vs "Write" classification. All "Write" tools (Stripe, Gmail, GitHub Write) MUST trigger an approval gate.

### Phase 3: Frontend Integration (Mission Control)
- **Action**: Create/Update `src/pages/NeuralEngine.jsx` (or `MissionControl.jsx`).
- **Route**: Ensure `/work/neural-engine` maps to this component.
- **UI Design ("Neon Glass")**:
  - Background: `#020202` (Deep Black).
  - Accents: `cyan-400` (#22d3ee) for activity/running states.
  - Typography: `Inter` for UI, `Space Mono` for logs/code.
  - Components:
    - **Status Panel**: Real-time connection status to MCP Host.
    - **Plan Visualizer**: A node-based or list-based view of the proposed plan.
    - **Approval Gate**: A distinct, high-contrast modal for "Approve Plan" vs "Reject/Refine".
    - **Terminal Output**: Scrolling log of tool execution results (using `font-mono`).

## 4. File Structure Changes
- `mcp_config.json` (New)
- `src/lib/engine/orchestrator.ts` (New)
- `src/pages/NeuralEngine.jsx` (Update/Refine)
- `src/components/PlanApprovalModal.jsx` (New)

## 5. Risk Assessment & Mitigation
- **Tool Execution Environment**: Browser-based React cannot directly execute `uvx` commands.
  - *Mitigation*: The `orchestrator.ts` is designed as a logic layer. In a real deployment, this would run on a Node.js backend (e.g., via a defined API endpoint or WebSocket). For this MVP, we will simulate the *Application Host* behavior or assume a local Node.js environment is available to run the engine script.
  - *Fallback*: If purely browser-based, we will mock the `uvx` execution or route it through the existing Python backend (requiring a Python-to-MCP bridge). Given the request for `.ts`, we assume a Node.js capability is present or planned.

## 6. Verification
- Verify `mcp_config.json` is valid JSON.
- Verify `orchestrator.ts` compiles and handles the Approval Gate state correctly.
- Verify the UI matches the specific "Neon Glass" aesthetics (Dark mode, specialized scrollbars).

---
**Status**: Ready for Review.
Please approve this plan to proceed with code generation.
