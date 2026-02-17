import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBookDemo } from '../context/BookDemoContext';
import { TopNavbar } from '../components/TopNavbar';
import './NeuralEngine.css';

// ─── API Config ──────────────────────────────────────────────────────────────
const API_BASE = 'http://localhost:8000';

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconTerminal = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
);
const IconBrain = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.58.63 3.03 1.75 4.09A6.5 6.5 0 0 0 2 17.5 6.5 6.5 0 0 0 8.5 24H12V2H9.5z" /><path d="M14.5 2A5.5 5.5 0 0 1 20 7.5c0 1.58-.63 3.03-1.75 4.09A6.5 6.5 0 0 1 22 17.5 6.5 6.5 0 0 1 15.5 24H12V2h2.5z" /></svg>
);
const IconSend = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
);
const IconActivity = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
);
const IconCode = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);
const IconTool = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
);
const IconCheck = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const IconLoader = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ne-spin"><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /><line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" /></svg>
);
const IconArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
const IconCopy = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
);
const IconDownload = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);
const IconError = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
);

import TOOLS, { CATEGORY_EMOJIS } from '../data/neuralTools';

// ─── Main Component ──────────────────────────────────────────────────────────
const NeuralEngine = () => {
    const { openBookDemo } = useBookDemo();
    const [prompt, setPrompt] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [backendStatus, setBackendStatus] = useState('checking'); // checking | online | offline
    const [currentWorkflow, setCurrentWorkflow] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [logs, setLogs] = useState([]);
    const [stepOutputs, setStepOutputs] = useState({}); // { stepId: output }
    const [activeTab, setActiveTab] = useState('logs');
    const [selectedOutput, setSelectedOutput] = useState(null); // step ID to show
    const [elapsedTime, setElapsedTime] = useState(0);
    const [copiedId, setCopiedId] = useState(null);
    const logEndRef = useRef(null);
    const timerRef = useRef(null);

    // Check backend status
    useEffect(() => {
        const checkBackend = async () => {
            try {
                const res = await fetch(`${API_BASE}/health`);
                if (res.ok) setBackendStatus('online');
                else setBackendStatus('offline');
            } catch {
                setBackendStatus('offline');
            }
        };
        checkBackend();
        const interval = setInterval(checkBackend, 10000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll logs
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // Timer
    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 100);
            }, 100);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning]);

    const addLog = useCallback((level, message) => {
        const ts = new Date().toISOString().split('T')[1].split('.')[0];
        setLogs(prev => [...prev, { ts, level, message, id: Date.now() + Math.random() }]);
    }, []);

    // ─── REAL Execution ────────────────────────────────────────────────────────
    const executeWorkflow = useCallback(async (inputPrompt) => {
        setCurrentWorkflow(inputPrompt);
        setTasks([]);
        setLogs([]);
        setStepOutputs({});
        setSelectedOutput(null);
        setElapsedTime(0);
        setIsRunning(true);

        addLog('system', '╔═══════════════════════════════════════════════════╗');
        addLog('system', '║  NEURAL WORKFLOW ENGINE v3.0 — LIVE MODE          ║');
        addLog('system', '║  Powered by Gemini (via OpenRouter) + FastAPI     ║');
        addLog('system', '╚═══════════════════════════════════════════════════╝');

        // ── STEP 1: Plan ──
        addLog('info', `► Received: "${inputPrompt}"`);
        addLog('info', '► Sending to AI Planner...');

        try {
            const planRes = await fetch(`${API_BASE}/api/plan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: inputPrompt }),
            });

            if (!planRes.ok) throw new Error(`Plan failed: ${planRes.status}`);

            const plan = await planRes.json();
            addLog('success', `✓ AI generated plan: "${plan.workflow_name}"`);
            addLog('success', `✓ ${plan.steps.length} steps identified`);
            addLog('info', '─'.repeat(52));

            // Set tasks from AI plan
            const initialTasks = plan.steps.map(s => ({
                id: s.id,
                tool: s.tool,
                action: s.action,
                input_description: s.input_description,
                status: 'pending',
            }));
            setTasks(initialTasks);

            // ── STEP 2: Execute each step ──
            addLog('warn', '► Beginning execution...');

            for (let i = 0; i < plan.steps.length; i++) {
                const step = plan.steps[i];

                // Mark as executing
                setTasks(prev => prev.map((t, idx) =>
                    idx === i ? { ...t, status: 'executing' } : t
                ));

                addLog('info', `[${i + 1}/${plan.steps.length}] ${step.action}`);
                addLog('tool', `    ↳ Tool: ${step.tool}`);

                try {
                    const execRes = await fetch(`${API_BASE}/api/execute-step`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            workflow_id: plan.workflow_id,
                            step_id: step.id,
                            tool: step.tool,
                            action: step.action,
                            context: inputPrompt,
                        }),
                    });

                    if (!execRes.ok) throw new Error(`Step ${step.id} failed: ${execRes.status}`);

                    const result = await execRes.json();

                    if (result.status === 'completed') {
                        // Store real output
                        setStepOutputs(prev => ({ ...prev, [step.id]: result.output }));

                        // Mark as done
                        setTasks(prev => prev.map((t, idx) =>
                            idx === i ? { ...t, status: 'done' } : t
                        ));
                        addLog('success', `    ✓ Completed — output generated (${result.output.length} chars)`);
                    } else {
                        throw new Error(result.error || 'Unknown error');
                    }
                } catch (stepError) {
                    // Mark as error but continue
                    setTasks(prev => prev.map((t, idx) =>
                        idx === i ? { ...t, status: 'error' } : t
                    ));
                    addLog('error', `    ✗ Error: ${stepError.message}`);
                }
            }

            addLog('info', '─'.repeat(52));
            addLog('success', '★ WORKFLOW COMPLETE — All steps executed');

        } catch (error) {
            addLog('error', `✗ Fatal error: ${error.message}`);
            if (backendStatus === 'offline') {
                addLog('warn', '⚠ Backend server is offline. Start it with: python backend/app/main.py');
            }
        }

        setIsRunning(false);
        clearInterval(timerRef.current);
    }, [addLog, backendStatus]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim() || isRunning) return;
        const p = prompt.trim();
        setPrompt('');
        executeWorkflow(p);
    };

    const handleQuickPrompt = (text) => {
        if (isRunning) return;
        executeWorkflow(text);
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const downloadAsFile = (text, filename) => {
        const blob = new Blob([text], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const formatTime = (ms) => {
        const s = Math.floor(ms / 1000);
        const m = Math.floor(s / 60);
        const rem = s % 60;
        return `${m.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
    };

    return (
        <div className="ne-root">
            <TopNavbar onOpenBookDemo={openBookDemo} />

            {/* Background */}
            <div className="ne-bg-grid" />
            <div className="ne-bg-glow-1" />
            <div className="ne-bg-glow-2" />

            <div className="ne-dashboard">
                {/* ── Header ── */}
                <motion.header
                    className="ne-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="ne-header__left">
                        <Link to="/" className="ne-back-btn">
                            <IconArrowLeft /> <span>Back to Home</span>
                        </Link>
                        <div className="ne-breadcrumbs">
                            work <span className="ne-breadcrumbs__sep">/</span> <span>neural-engine</span>
                        </div>
                    </div>

                    <div className="ne-header__center">
                        <div className="ne-logo">
                            <div className="ne-logo__icon ne-logo__icon--mandelbrot">
                                M
                            </div>
                            <div className="ne-logo__text">
                                <span className="ne-logo__title">MANDELBROT</span>
                                <span className="ne-logo__subtitle">NEURAL ENGINE v3.0 • Gemini AI • Live</span>
                            </div>
                        </div>
                    </div>

                    <div className="ne-header__right">
                        <div className="ne-status-badge">
                            <div className={`ne-status-dot ${backendStatus === 'offline' ? 'ne-status-dot--error' : ''}`} />
                            <span>{
                                backendStatus === 'online' ? (isRunning ? 'EXECUTING' : 'ONLINE') :
                                    backendStatus === 'offline' ? 'OFFLINE' : 'CHECKING...'
                            }</span>
                        </div>
                        <div className="ne-tool-count">
                            <IconTool /> <span>{TOOLS.length} Tools</span>
                        </div>
                    </div>
                </motion.header>

                {/* Backend Offline Banner */}
                <AnimatePresence>
                    {backendStatus === 'offline' && (
                        <motion.div
                            className="ne-offline-banner"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="ne-offline-banner__content">
                                <IconError />
                                <div>
                                    <strong>Backend server is not running.</strong>
                                    <p>Start it with: <code>cd backend && pip install fastapi uvicorn httpx && python -m uvicorn app.main:app --reload --port 8000</code></p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Main Grid ── */}
                <div className="ne-grid">
                    {/* ── Left: Pipeline ── */}
                    <motion.aside
                        className="ne-panel ne-panel--left"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="ne-panel__header">
                            <div className="ne-panel__title">
                                <IconActivity />
                                <span>Execution Pipeline</span>
                            </div>
                            {isRunning && <div className="ne-panel__live-badge">LIVE</div>}
                        </div>

                        <div className="ne-pipeline">
                            {tasks.length === 0 ? (
                                <div className="ne-pipeline__empty">
                                    <div className="ne-pipeline__empty-icon"><IconBrain /></div>
                                    <p>Submit a prompt to generate<br />a real AI execution plan</p>
                                </div>
                            ) : (
                                <div className="ne-pipeline__list">
                                    {tasks.map((task, idx) => (
                                        <motion.div
                                            key={task.id}
                                            className={`ne-task ne-task--${task.status} ${selectedOutput === task.id ? 'ne-task--selected' : ''}`}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            onClick={() => {
                                                if (stepOutputs[task.id]) {
                                                    setSelectedOutput(task.id);
                                                    setActiveTab('artifacts');
                                                }
                                            }}
                                            style={{ cursor: stepOutputs[task.id] ? 'pointer' : 'default' }}
                                        >
                                            <div className="ne-task__indicator">
                                                {task.status === 'done' && <IconCheck />}
                                                {task.status === 'executing' && <IconLoader />}
                                                {task.status === 'error' && <IconError />}
                                                {task.status === 'pending' && <span className="ne-task__number">{idx + 1}</span>}
                                            </div>
                                            <div className="ne-task__content">
                                                <div className="ne-task__action">{task.action}</div>
                                                <div className="ne-task__tool">
                                                    <IconTool /> {task.tool}
                                                    {stepOutputs[task.id] && (
                                                        <span className="ne-task__output-badge">📄 View Output</span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {(isRunning || elapsedTime > 0) && (
                            <div className="ne-timer">
                                <span className="ne-timer__label">Elapsed</span>
                                <span className="ne-timer__value">{formatTime(elapsedTime)}</span>
                            </div>
                        )}
                    </motion.aside>

                    {/* ── Center: Command ── */}
                    <motion.div
                        className="ne-panel ne-panel--center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="ne-command">
                            <div className="ne-command__label">
                                <IconBrain />
                                <span>Mission Directive</span>
                                <span className="ne-command__mode">LIVE AI</span>
                            </div>
                            <form onSubmit={handleSubmit} className="ne-command__form">
                                <input
                                    type="text"
                                    className="ne-command__input"
                                    placeholder={backendStatus === 'offline'
                                        ? "Start the backend server first..."
                                        : "Describe what you need done in plain English..."
                                    }
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    disabled={isRunning || backendStatus === 'offline'}
                                    id="neural-engine-prompt"
                                />
                                <button
                                    type="submit"
                                    className="ne-command__submit"
                                    disabled={isRunning || !prompt.trim() || backendStatus === 'offline'}
                                    id="neural-engine-submit"
                                >
                                    {isRunning ? <IconLoader /> : <IconSend />}
                                </button>
                            </form>
                        </div>

                        {/* Quick Prompts */}
                        {!currentWorkflow && (
                            <motion.div
                                className="ne-quickprompts"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <span className="ne-quickprompts__label">Solo Founder Quick Actions</span>
                                <div className="ne-quickprompts__grid">
                                    {[
                                        { emoji: '📧', text: 'Draft a cold outreach email to a potential client for my SaaS product' },
                                        { emoji: '📄', text: 'Create a one-page business proposal for a web development project' },
                                        { emoji: '📊', text: 'Analyze my competitor landscape and suggest differentiation strategies' },
                                        { emoji: '📅', text: 'Create a 30-day product launch plan with daily tasks and milestones' },
                                        { emoji: '💻', text: 'Write a Python script to scrape product reviews from a URL' },
                                        { emoji: '✍️', text: 'Write 5 LinkedIn posts about AI automation for small businesses' },
                                    ].map((qp) => (
                                        <button
                                            key={qp.text}
                                            className="ne-quickprompt"
                                            onClick={() => handleQuickPrompt(qp.text)}
                                            disabled={isRunning || backendStatus === 'offline'}
                                        >
                                            <span className="ne-quickprompt__emoji">{qp.emoji}</span>
                                            <span className="ne-quickprompt__text">{qp.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Active Workflow Info */}
                        <AnimatePresence>
                            {currentWorkflow && (
                                <motion.div
                                    className="ne-workflow-info"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <div className="ne-workflow-info__header">
                                        <span className="ne-workflow-info__label">Active Workflow</span>
                                        <span className={`ne-workflow-info__status ne-workflow-info__status--${isRunning ? 'running' : 'done'}`}>
                                            {isRunning ? '● Running' : '● Complete'}
                                        </span>
                                    </div>
                                    <div className="ne-workflow-info__prompt">"{currentWorkflow}"</div>
                                    <div className="ne-workflow-info__stats">
                                        <div className="ne-stat">
                                            <span className="ne-stat__value">{tasks.length}</span>
                                            <span className="ne-stat__label">Tasks</span>
                                        </div>
                                        <div className="ne-stat">
                                            <span className="ne-stat__value">{tasks.filter(t => t.status === 'done').length}</span>
                                            <span className="ne-stat__label">Completed</span>
                                        </div>
                                        <div className="ne-stat">
                                            <span className="ne-stat__value">{Object.keys(stepOutputs).length}</span>
                                            <span className="ne-stat__label">Outputs</span>
                                        </div>
                                    </div>

                                    {/* New workflow button */}
                                    {!isRunning && tasks.length > 0 && (
                                        <button
                                            className="ne-new-workflow-btn"
                                            onClick={() => {
                                                setCurrentWorkflow(null);
                                                setTasks([]);
                                                setLogs([]);
                                                setStepOutputs({});
                                                setSelectedOutput(null);
                                                setElapsedTime(0);
                                            }}
                                        >
                                            + New Workflow
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* ── Right: Logs / Artifacts / Tools ── */}
                    <motion.aside
                        className="ne-panel ne-panel--right"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="ne-tabs">
                            <button className={`ne-tab ${activeTab === 'logs' ? 'ne-tab--active' : ''}`} onClick={() => setActiveTab('logs')}>
                                <IconTerminal /> Logs
                            </button>
                            <button className={`ne-tab ${activeTab === 'artifacts' ? 'ne-tab--active' : ''}`} onClick={() => setActiveTab('artifacts')}>
                                <IconCode /> Outputs {Object.keys(stepOutputs).length > 0 && <span className="ne-tab__count">{Object.keys(stepOutputs).length}</span>}
                            </button>
                            <button className={`ne-tab ${activeTab === 'tools' ? 'ne-tab--active' : ''}`} onClick={() => setActiveTab('tools')}>
                                <IconTool /> Tools
                            </button>
                        </div>

                        <div className="ne-tab-content">
                            {/* LOGS */}
                            {activeTab === 'logs' && (
                                <div className="ne-logs">
                                    {logs.length === 0 ? (
                                        <div className="ne-logs__empty">
                                            <IconTerminal />
                                            <p>Real-time execution logs will appear here</p>
                                        </div>
                                    ) : (
                                        <div className="ne-logs__list">
                                            {logs.map((log) => (
                                                <div key={log.id} className={`ne-log ne-log--${log.level}`}>
                                                    <span className="ne-log__ts">{log.ts}</span>
                                                    <span className="ne-log__msg">{log.message}</span>
                                                </div>
                                            ))}
                                            <div ref={logEndRef} />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* OUTPUTS (Real AI-generated content) */}
                            {activeTab === 'artifacts' && (
                                <div className="ne-artifacts">
                                    {Object.keys(stepOutputs).length === 0 ? (
                                        <div className="ne-artifacts__empty">
                                            <IconCode />
                                            <p>AI-generated outputs will appear here.<br />Click a completed step to view its output.</p>
                                        </div>
                                    ) : (
                                        <div className="ne-artifacts__list">
                                            {Object.entries(stepOutputs).map(([stepId, output]) => {
                                                const task = tasks.find(t => t.id === parseInt(stepId));
                                                return (
                                                    <div key={stepId} className={`ne-artifact ${selectedOutput === parseInt(stepId) ? 'ne-artifact--selected' : ''}`}>
                                                        <div className="ne-artifact__header">
                                                            <div className="ne-artifact__header-left">
                                                                <IconCode />
                                                                <span>Step {stepId}: {task?.action || 'Output'}</span>
                                                            </div>
                                                            <div className="ne-artifact__actions">
                                                                <button
                                                                    className="ne-artifact__action-btn"
                                                                    onClick={() => copyToClipboard(output, stepId)}
                                                                    title="Copy to clipboard"
                                                                >
                                                                    {copiedId === stepId ? <IconCheck /> : <IconCopy />}
                                                                    {copiedId === stepId ? 'Copied!' : 'Copy'}
                                                                </button>
                                                                <button
                                                                    className="ne-artifact__action-btn"
                                                                    onClick={() => downloadAsFile(output, `step-${stepId}-output.md`)}
                                                                    title="Download as file"
                                                                >
                                                                    <IconDownload /> Save
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="ne-artifact__code ne-artifact__code--md">
                                                            {output}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* TOOLS */}
                            {activeTab === 'tools' && (
                                <div className="ne-tools-list">
                                    <div className="ne-tools-list__header">
                                        <span>{TOOLS.length} AI-powered tools across {[...new Set(TOOLS.map(t => t.category))].length} categories</span>
                                    </div>
                                    {/* Categorized Tools List */}
                                    {[...new Set(TOOLS.map(t => t.category))].map(category => {
                                        const categoryTools = TOOLS.filter(t => t.category === category);
                                        // Use imported emojis or fallback
                                        const emoji = CATEGORY_EMOJIS[category] || '🔧';

                                        return (
                                            <div key={category} className="ne-tools-category">
                                                <div className="ne-tools-category__header">
                                                    <span>{emoji} {category}</span>
                                                    <span className="ne-tools-category__count">{categoryTools.length}</span>
                                                </div>
                                                <div className="ne-tools-list__grid">
                                                    {categoryTools.map((tool) => {
                                                        const isActive = tasks.some(t => t.tool === tool.name && t.status === 'executing');
                                                        const isUsed = tasks.some(t => t.tool === tool.name && t.status === 'done');
                                                        return (
                                                            <div
                                                                key={tool.name}
                                                                className={`ne-tool-chip ${isActive ? 'ne-tool-chip--active' : ''} ${isUsed ? 'ne-tool-chip--used' : ''}`}
                                                            >
                                                                <span className="ne-tool-chip__emoji">{tool.emoji}</span>
                                                                <span className="ne-tool-chip__service">{tool.name.split('.')[0]}</span>
                                                                <span className="ne-tool-chip__method">.{tool.name.split('.')[1]}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </motion.aside>
                </div>

                {/* Footer */}
                <motion.footer
                    className="ne-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <span>Mandelbrot Neural Engine</span>
                    <span className="ne-footer__sep">•</span>
                    <span>Real AI • Real Outputs</span>
                    <span className="ne-footer__sep">•</span>
                    <span>{TOOLS.length} Tools Available</span>
                </motion.footer>
            </div>
        </div>
    );
};

export default NeuralEngine;
