import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import RiskBadge from '../../components/RiskBadge/RiskBadge';
import TrendIndicator from '../../components/TrendIndicator/TrendIndicator';
import MetricWidget from '../../components/MetricWidget/MetricWidget';
import { mockRiskScores, generateRiskHistory } from '../../mocks/mockRiskScores';
import { mockExplainability } from '../../mocks/mockExplainability';
import { REGIONS, SIGNAL_TYPES } from '../../utils/constants';
import { getRiskColor, getRiskLevel } from '../../utils/riskLevels';
import './DetailPage.css';

const signalColors = {
    market: '#818CF8', logistics: '#FBBF24', climate: '#22D3EE',
    behavioral: '#A78BFA', event: '#F472B6',
};

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
                <div key={i} style={{ color: p.color || 'var(--color-text-primary)' }}>
                    {p.name}: <strong>{p.value}</strong>
                </div>
            ))}
        </div>
    );
}

function ScoreRing({ score, size = 130 }) {
    const level = getRiskLevel(score);
    const color = getRiskColor(level);
    const radius = (size - 14) / 2;
    const circumference = 2 * Math.PI * radius;
    const arc = circumference * 0.75;
    const filled = (score / 100) * arc;

    return (
        <div className="score-ring" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke="rgba(148,163,184,0.06)" strokeWidth="10"
                    strokeDasharray={`${arc} ${circumference}`} strokeLinecap="round"
                />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={color} strokeWidth="10"
                    strokeDasharray={`${filled} ${circumference}`} strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${filled} ${circumference}` }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
                />
            </svg>
            <motion.div
                className="score-ring-value"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
            >
                <span className="score-num" style={{ color }}>{score}</span>
                <span className="score-label">Risk</span>
            </motion.div>
        </div>
    );
}

export default function DetailPage() {
    const { commodity, region } = useParams();
    const decodedCommodity = decodeURIComponent(commodity);
    const regionInfo = REGIONS.find(r => r.code === region);
    const entry = mockRiskScores.find(r => r.commodity === decodedCommodity && r.region === region);
    const explain = mockExplainability[`${decodedCommodity}-${region}`];
    const history = generateRiskHistory(decodedCommodity, region);

    if (!entry) {
        return (
            <div className="detail-page">
                <div className="page-header">
                    <h1>Not Found</h1>
                    <p>No risk data for {decodedCommodity} in {region}. <Link to="/">← Back</Link></p>
                </div>
            </div>
        );
    }

    return (
        <motion.div className="detail-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="detail-breadcrumb">
                <Link to="/">Overview</Link>
                <span>/</span>
                <span>{decodedCommodity}</span>
                <span>/</span>
                <span>{regionInfo?.name || region}</span>
            </div>

            <div className="detail-hero">
                <div className="detail-hero-main">
                    <div className="detail-hero-titles">
                        <h1>
                            <span className="commodity-name">{decodedCommodity}</span>
                            <span className="region-name">— {regionInfo?.name || region}</span>
                        </h1>
                        <div className="detail-hero-tags">
                            <RiskBadge level={entry.riskLevel} />
                            <TrendIndicator trend={entry.trend} />
                        </div>
                    </div>
                </div>
                <div className="score-ring-container">
                    <ScoreRing score={entry.combinedScore} size={90} />
                </div>
            </div>

            <div className="dual-scores">
                <MetricWidget label="Supply Stress" value={entry.supplyStressScore} unit="/100" color={getRiskColor(getRiskLevel(entry.supplyStressScore))} />
                <MetricWidget label="Price Shock Risk" value={entry.priceShockScore} unit="/100" color={getRiskColor(getRiskLevel(entry.priceShockScore))} />
            </div>

            {explain && (
                <div className="section-card">
                    <h2>Explainability Report</h2>
                    <div className="explain-summary">{explain.summary}</div>

                    <div className="section-label">Contributing Factors</div>
                    <div className="factor-list">
                        {explain.contributingFactors.map((factor, i) => (
                            <motion.div
                                key={i}
                                className="factor-item"
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                                <div className="factor-icon" style={{
                                    background: `${signalColors[factor.signalType]}15`,
                                    color: signalColors[factor.signalType],
                                    border: `1px solid ${signalColors[factor.signalType]}20`
                                }}>
                                    {factor.contributionPct}%
                                </div>
                                <div className="factor-content">
                                    <div className="factor-header">
                                        <span className="factor-type">{SIGNAL_TYPES.find(s => s.key === factor.signalType)?.label || factor.signalType}</span>
                                        <span className="factor-pct" style={{ color: signalColors[factor.signalType] }}>{factor.contributionPct}%</span>
                                    </div>
                                    <div className="factor-desc">{factor.description}</div>
                                    <div className="factor-bar">
                                        <motion.div
                                            className="factor-bar-fill"
                                            style={{ background: `linear-gradient(90deg, ${signalColors[factor.signalType]}, ${signalColors[factor.signalType]}60)` }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${factor.contributionPct}%` }}
                                            transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
                                        />
                                    </div>
                                    <div className="factor-values">
                                        <span>Baseline: {factor.baselineValue}</span>
                                        <span>Observed: <strong style={{ color: 'var(--color-text-primary)' }}>{factor.observedValue}</strong></span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="structural-badge" style={{
                        background: explain.structuralAssessment.toLowerCase().includes('critical') ? 'rgba(248,113,113,0.08)' : 'rgba(251,146,60,0.08)',
                        color: explain.structuralAssessment.toLowerCase().includes('critical') ? '#F87171' : '#FB923C',
                        border: `1px solid ${explain.structuralAssessment.toLowerCase().includes('critical') ? 'rgba(248,113,113,0.15)' : 'rgba(251,146,60,0.15)'}`,
                    }}>
                        {explain.structuralAssessment}
                    </div>

                    {explain.harmPotential && (
                        <>
                            <div className="section-label">Potential Harm Assessment</div>
                            <div className="harm-grid">
                                <div className="harm-card">
                                    <h4>Small Seller Impact</h4>
                                    <p>{explain.harmPotential.smallSellers}</p>
                                </div>
                                <div className="harm-card">
                                    <h4>Consumer Impact</h4>
                                    <p>{explain.harmPotential.consumers}</p>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="section-label">Recommended Stabilizing Actions</div>
                    <div className="action-list">
                        {explain.recommendedActions.map((action, i) => (
                            <div key={i} className="action-item">
                                <span className="action-item-num">{i + 1}</span>
                                {action}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="section-card">
                <h2>Risk Score Trend</h2>
                <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 4 }}>90-day rolling window</div>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={history} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                            <defs>
                                <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#818CF8" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#818CF8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date" tick={{ fill: '#475569', fontSize: 10 }}
                                tickFormatter={v => v.slice(5)} axisLine={{ stroke: 'rgba(148,163,184,0.06)' }} tickLine={false}
                            />
                            <YAxis
                                domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }}
                                axisLine={false} tickLine={false} tickCount={5}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(148,163,184,0.1)' }} />
                            <Area
                                type="monotone" dataKey="combinedScore" stroke="#818CF8" strokeWidth={2}
                                fill="url(#riskGrad)" dot={false} name="Combined Score"
                                activeDot={{ r: 4, stroke: '#818CF8', strokeWidth: 2, fill: 'var(--color-bg-primary)' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}
