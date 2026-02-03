import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PricingCalculator = () => {
    // Inputs
    const [employeeRate, setEmployeeRate] = useState(25); // Hourly rate in $
    const [tasksPerMonth, setTasksPerMonth] = useState(500);
    const [minsPerTask, setMinsPerTask] = useState(15);
    const [activeAgents, setActiveAgents] = useState(1);

    // AI Costs
    const baseSubscription = 750; // Solo Founder Tier Base
    const costPerTask = 0.05; // Compute cost per task avg

    // Outputs
    const [metrics, setMetrics] = useState({
        monthlyHumanCost: 0,
        monthlyAiCost: 0,
        monthlySavings: 0,
        annualSavings: 0,
        efficiencyGain: 0,
        hoursSaved: 0
    });

    useEffect(() => {
        // Human Cost Calculation
        const totalHumanHours = (tasksPerMonth * minsPerTask) / 60;
        const humanCost = totalHumanHours * employeeRate;

        // AI Cost Calculation
        // Assuming 1 agent covers baseline, scalable compute per task
        const aiComputeCost = tasksPerMonth * costPerTask;
        const aiTotalCost = (baseSubscription * activeAgents) + aiComputeCost;

        // Savings
        const mSavings = Math.max(0, humanCost - aiTotalCost);
        const aSavings = mSavings * 12;

        // Efficiency (ROI %)
        const efficiency = aiTotalCost > 0 ? ((humanCost - aiTotalCost) / aiTotalCost) * 100 : 0;

        setMetrics({
            monthlyHumanCost: Math.floor(humanCost),
            monthlyAiCost: Math.floor(aiTotalCost),
            monthlySavings: Math.floor(mSavings),
            annualSavings: Math.floor(aSavings),
            efficiencyGain: Math.floor(efficiency),
            hoursSaved: Math.floor(totalHumanHours)
        });

    }, [employeeRate, tasksPerMonth, minsPerTask, activeAgents]);

    const InputRange = ({ label, value, setValue, min, max, step, suffix = "" }) => (
        <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold tracking-widest text-slate-400">
                <span>{label}</span>
                <span className="text-white font-mono">{value}{suffix}</span>
            </div>
            <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
        </div>
    );

    return (
        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02]">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                    <span className="text-cyan-500">ROI</span> ANALYSIS ENGINE
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">LIVE</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Controls Section */}
                <div className="p-6 md:p-8 space-y-8 border-r border-white/5 bg-white/[0.01]">
                    <InputRange
                        label="HOURLY EMPLOYEE RATE"
                        value={employeeRate} setValue={setEmployeeRate}
                        min={15} max={150} step={5} suffix=" USD"
                    />
                    <InputRange
                        label="TASKS PER MONTH"
                        value={tasksPerMonth} setValue={setTasksPerMonth}
                        min={100} max={10000} step={100}
                    />
                    <InputRange
                        label="AVG TIME PER TASK"
                        value={minsPerTask} setValue={setMinsPerTask}
                        min={5} max={120} step={5} suffix=" MIN"
                    />
                    <InputRange
                        label="ACTIVE AGENTS DEPLOYED"
                        value={activeAgents} setValue={setActiveAgents}
                        min={1} max={10} step={1}
                    />

                    <div className="pt-6 border-t border-white/5">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                            <span>Traditional Operation Cost</span>
                            <span className="text-white font-mono">${metrics.monthlyHumanCost.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Mandelbrot Operation Cost</span>
                            <span className="text-cyan-400 font-mono">${metrics.monthlyAiCost.toLocaleString()}/mo</span>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-cyan-950/10 to-transparent relative overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    <div className="relative z-10 space-y-8 text-center lg:text-right">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2 flex items-center justify-center lg:justify-end gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Net Monthly Savings
                            </p>
                            <motion.div
                                key={metrics.monthlySavings}
                                initial={{ scale: 0.95, opacity: 0.5 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-5xl md:text-6xl font-black text-white tracking-tighter"
                            >
                                ${metrics.monthlySavings.toLocaleString()}
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <p className="text-[10px] uppercase text-slate-500 mb-1">Hours Saved / Mo</p>
                                <div className="text-2xl font-bold text-white font-mono">{metrics.hoursSaved}h</div>
                            </div>
                            <div className="bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <p className="text-[10px] uppercase text-slate-500 mb-1">Efficiency Gain</p>
                                <div className="text-2xl font-bold text-cyan-400 font-mono">+{metrics.efficiencyGain}%</div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Projected Annual Impact</p>
                            <motion.div
                                key={metrics.annualSavings}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                            >
                                ${metrics.annualSavings.toLocaleString()} USD
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-cyan-500/10 border-t border-cyan-500/20 p-4 text-center">
                <button className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors">
                    Download Full Financial Breakdown ↓
                </button>
            </div>
        </div>
    );
};
