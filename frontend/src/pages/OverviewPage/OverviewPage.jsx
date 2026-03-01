import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Activity, Clock, Shield, Zap } from 'lucide-react';
import MetricWidget from '../../components/MetricWidget/MetricWidget';
import AlertCard from '../../components/AlertCard/AlertCard';
import { mockRiskScores } from '../../mocks/mockRiskScores';
import { mockAlerts } from '../../mocks/mockAlerts';
import { COMMODITIES, REGIONS } from '../../utils/constants';
import './OverviewPage.css';

function getHeatmapStyle(score) {
    if (score <= 25) return { bg: 'rgba(52,211,153,0.15)', text: '#0F172A' };
    if (score <= 50) return { bg: 'rgba(251,191,36,0.15)', text: '#0F172A' };
    if (score <= 75) return { bg: 'rgba(251,146,60,0.2)', text: '#0F172A' };
    return { bg: 'rgba(248,113,113,0.22)', text: '#0F172A' };
}

export default function OverviewPage() {
    const navigate = useNavigate();

    const stats = useMemo(() => {
        const critical = mockRiskScores.filter(r => r.riskLevel === 'critical').length;
        const high = mockRiskScores.filter(r => r.riskLevel === 'high').length;
        const avgScore = Math.round(mockRiskScores.reduce((s, r) => s + r.combinedScore, 0) / mockRiskScores.length);
        const rising = mockRiskScores.filter(r => r.trend === 'rising').length;
        return { critical, high, avgScore, rising };
    }, []);

    return (
        <div className="overview-page">
            {/* Hero header */}
            <div className="overview-header-row">
                <div className="overview-hero">
                    <h1><span>Price Shield</span> — National Risk Overview</h1>
                    <p>Essential goods price shock protection across India's supply chain</p>
                    <div className="overview-hero-subtitle">
                        <Zap size={14} className="hero-zap-icon" /> System operational — Monitoring {COMMODITIES.length} commodities × {REGIONS.length} regions
                    </div>
                </div>
                <div className="global-search-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" placeholder="Global Search" />
                </div>
            </div>

            {/* Top metric cards */}
            <div className="metrics-row">
                <MetricWidget
                    label="CRITICAL ALERTS"
                    value={stats.critical}
                    color="var(--color-risk-critical)"
                    icon={<AlertTriangle size={18} />}
                    footer="Critical alert trend"
                    trendTag="↑ 12% vs last week"
                    chartData={[10, 12, 11, 14, 13, 16, 15, 19].map((v, i) => ({ value: v, name: i }))}
                />
                <MetricWidget
                    label="HIGH-RISK PAIRS"
                    value={stats.high}
                    color="var(--color-risk-high)"
                    icon={<Activity size={18} />}
                    footer="High-risk commodity-region pairs"
                    trendTag="↑ 5%"
                    chartData={[20, 22, 21, 23, 22, 25, 24, 24].map((v, i) => ({ value: v, name: i }))}
                />
                <MetricWidget
                    label="AVG LEAD TIME"
                    value="4.2"
                    unit="days"
                    color="var(--color-signal-market)"
                    icon={<Clock size={18} />}
                    footer="Average risk mitigation period"
                    chartData={[4.0, 4.0, 4.1, 4.0, 4.1, 4.2, 4.1, 4.2].map((v, i) => ({ value: v, name: i }))}
                />
                <MetricWidget
                    label="THIS WEEK"
                    value={5}
                    unit="actions"
                    color="var(--color-risk-low)"
                    icon={<Shield size={18} />}
                    footer="preventive actions taken"
                    trendTag="↑ 15%"
                    chartData={[1, 2, 2, 3, 3, 4, 4, 5].map((v, i) => ({ value: v, name: i }))}
                />
            </div>

            {/* Main body */}
            <div className="overview-body">
                {/* Heatmap */}
                <motion.div
                    className="heatmap-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <div className="heatmap-header">
                        <div className="heatmap-title-group">
                            <div className="heatmap-title">Risk Heatmap</div>
                            <div className="heatmap-search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <input type="text" placeholder="Filter by..." />
                            </div>
                        </div>
                        <div className="heatmap-legend">
                            <div className="heatmap-legend-item"><span className="heatmap-legend-dot" style={{ background: '#34D399' }} /> Low</div>
                            <div className="heatmap-legend-item"><span className="heatmap-legend-dot" style={{ background: '#FBBF24' }} /> Moderate</div>
                            <div className="heatmap-legend-item"><span className="heatmap-legend-dot" style={{ background: '#FB923C' }} /> High</div>
                            <div className="heatmap-legend-item"><span className="heatmap-legend-dot" style={{ background: '#EF4444' }} /> Critical</div>
                        </div>
                    </div>

                    <div className="heatmap-grid-wrapper">
                        <div className="heatmap-grid" style={{ gridTemplateColumns: `120px repeat(${REGIONS.length}, 1fr)` }}>
                            {/* Header */}
                            <div className="heatmap-header-cell" />
                            {REGIONS.map(r => (
                                <div key={r.code} className="heatmap-header-cell">{r.code}</div>
                            ))}

                            {/* Rows */}
                            {COMMODITIES.map(commodity => (
                                <React.Fragment key={commodity}>
                                    <div className="heatmap-row-label">{commodity}</div>
                                    {REGIONS.map(region => {
                                        const entry = mockRiskScores.find(r => r.commodity === commodity && r.region === region.code);
                                        const score = entry?.combinedScore || 0;
                                        const s = getHeatmapStyle(score);
                                        return (
                                            <div
                                                key={`${commodity}-${region.code}`}
                                                className="heatmap-cell"
                                                style={{ background: s.bg, color: s.text }}
                                                onClick={() => navigate(`/risk/${encodeURIComponent(commodity)}/${region.code}`)}
                                            >
                                                {score}
                                                {entry?.trend === 'rising' && <span className="heatmap-trend-arrow">↑</span>}
                                                {entry?.trend === 'falling' && <span className="heatmap-trend-arrow">↓</span>}
                                                <span className="tooltip">
                                                    <strong>{commodity}</strong> — {region.name}<br />
                                                    Score: {score}/100 &nbsp;·&nbsp; Trend: {entry?.trend}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right panel */}
                <div className="overview-right">
                    <div className="recent-alerts-section">
                        <div className="recent-alerts-header">
                            <h2>Recent Alerts</h2>
                            <Link to="/alerts">View all →</Link>
                        </div>
                        <div className="recent-alerts-list">
                            {mockAlerts.slice(0, 4).map(alert => (
                                <AlertCard
                                    key={alert.id}
                                    alert={alert}
                                    compact
                                    onClick={() => navigate(`/risk/${encodeURIComponent(alert.commodity)}/${alert.region}`)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Status strip */}
            <div className="overview-status-strip">
                <span><span className="status-dot" /> All signal sources active — Last update: 2 min ago</span>
                <span>{mockRiskScores.length} pairs monitored</span>
            </div>
        </div>
    );
}
