import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { COMMODITIES, REGIONS, SIGNAL_TYPES } from '../../utils/constants';
import { generateSignalData } from '../../mocks/mockSignals';
import './SignalsPage.css';

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)',
            borderRadius: 10, padding: '10px 14px', fontSize: 11, lineHeight: 1.6,
            boxShadow: 'var(--shadow-md)', backdropFilter: 'blur(12px)',
        }}>
            <div style={{ color: 'var(--color-text-secondary)', marginBottom: 4, fontWeight: 500 }}>{label}</div>
            {payload.map((p, i) => (
                <div key={i} style={{ color: p.color, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
                    {p.name}: <strong>{p.value}</strong>
                </div>
            ))}
        </div>
    );
}

export default function SignalsPage() {
    const [commodity, setCommodity] = useState('Onion');
    const [region, setRegion] = useState('MH');

    return (
        <div className="signals-page">
            <div className="signals-header">
                <h1>Signal Explorer</h1>
                <p>Multi-source signal analysis with baseline deviation tracking</p>
            </div>

            <div className="signals-controls">
                <select value={commodity} onChange={e => setCommodity(e.target.value)}>
                    {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={region} onChange={e => setRegion(e.target.value)}>
                    {REGIONS.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
                </select>
            </div>

            <div className="signals-grid">
                {SIGNAL_TYPES.map((signal, idx) => {
                    const data = generateSignalData(commodity, region, signal.key);
                    return (
                        <motion.div
                            key={signal.key}
                            className="signal-chart-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.06 }}
                        >
                            <div className="signal-chart-header">
                                <h3>
                                    <span className="signal-type-dot" style={{ background: signal.color, color: signal.color }} />
                                    {signal.label}
                                </h3>
                                <div className="signal-chart-labels">
                                    <span><span className="line-sample" style={{ background: signal.color }} /> Observed</span>
                                    <span><span className="line-sample dashed" /> Baseline</span>
                                </div>
                            </div>
                            <div className="signal-chart-wrap">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                                        <defs>
                                            <linearGradient id={`grad-${signal.key}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={signal.color} stopOpacity={0.2} />
                                                <stop offset="100%" stopColor={signal.color} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fill: '#475569', fontSize: 10 }}
                                            tickFormatter={v => v.slice(5)}
                                            interval={14}
                                            axisLine={{ stroke: 'rgba(148,163,184,0.06)' }}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            domain={[0, 100]}
                                            tick={{ fill: '#475569', fontSize: 10 }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickCount={5}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(148,163,184,0.1)', strokeWidth: 1 }} />
                                        <Area
                                            type="monotone" dataKey="baseline"
                                            stroke="#475569" strokeWidth={1} strokeDasharray="4 4"
                                            fill="none" dot={false} name="Baseline"
                                        />
                                        <Area
                                            type="monotone" dataKey="observed"
                                            stroke={signal.color} strokeWidth={2}
                                            fill={`url(#grad-${signal.key})`}
                                            dot={false} name="Observed"
                                            activeDot={{ r: 4, stroke: signal.color, strokeWidth: 2, fill: 'var(--color-bg-primary)' }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
