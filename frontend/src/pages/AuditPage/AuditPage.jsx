import { useState } from 'react';
import { formatDateTime } from '../../utils/formatters';
import './AuditPage.css';

const mockAuditLogs = [
    { id: 1, type: 'ingestion', commodity: 'Onion', region: 'Maharashtra', summary: 'Mandi price signal ingested from Nashik APMC', timestamp: '2026-02-28T14:32:00Z', user: null },
    { id: 2, type: 'risk_score', commodity: 'Onion', region: 'Maharashtra', summary: 'Risk score updated: 78 → 82 (+4 pts, significant change)', timestamp: '2026-02-28T14:33:00Z', user: null },
    { id: 3, type: 'alert', commodity: 'Onion', region: 'Maharashtra', summary: 'Critical alert ALT-001 generated and delivered to 5 stakeholders', timestamp: '2026-02-28T14:34:00Z', user: null },
    { id: 4, type: 'intervention', commodity: 'Onion', region: 'Maharashtra', summary: 'Buffer stock release recorded by District Collector, Nashik', timestamp: '2026-02-28T16:00:00Z', user: 'District Collector' },
    { id: 5, type: 'ingestion', commodity: 'Tomato', region: 'Karnataka', summary: 'Climate signal ingested: rainfall deviation -40% in Kolar', timestamp: '2026-02-28T10:12:00Z', user: null },
    { id: 6, type: 'risk_score', commodity: 'Tomato', region: 'Karnataka', summary: 'Risk score updated: 65 → 71 (+6 pts)', timestamp: '2026-02-28T10:13:00Z', user: null },
    { id: 7, type: 'alert', commodity: 'Mustard Oil', region: 'Rajasthan', summary: 'Critical alert ALT-005 generated, priority: critical', timestamp: '2026-02-26T18:01:00Z', user: null },
    { id: 8, type: 'access', commodity: null, region: null, summary: 'User login: Analyst Karan S. from IP 103.21.x.x', timestamp: '2026-02-28T09:00:00Z', user: 'Karan S.' },
    { id: 9, type: 'ingestion', commodity: 'Rice', region: 'West Bengal', summary: 'Railway delay signal ingested: 180min average delay on Eastern corridor', timestamp: '2026-02-27T16:40:00Z', user: null },
    { id: 10, type: 'intervention', commodity: 'Mustard Oil', region: 'Rajasthan', summary: 'Import facilitation recorded by Food & Civil Supplies Dept', timestamp: '2026-02-27T10:02:00Z', user: 'FCSD Officer' },
];

const typeColors = {
    ingestion: { bg: 'rgba(6, 182, 212, 0.12)', color: '#06B6D4' },
    risk_score: { bg: 'rgba(99, 102, 241, 0.12)', color: '#6366F1' },
    alert: { bg: 'rgba(239, 68, 68, 0.12)', color: '#EF4444' },
    intervention: { bg: 'rgba(16, 185, 129, 0.12)', color: '#10B981' },
    access: { bg: 'rgba(156, 163, 175, 0.12)', color: '#9CA3AF' },
};

export default function AuditPage() {
    const [typeFilter, setTypeFilter] = useState('all');
    const filtered = typeFilter === 'all' ? mockAuditLogs : mockAuditLogs.filter(l => l.type === typeFilter);

    return (
        <div className="audit-page">
            <div className="page-header">
                <h1>Audit Log</h1>
                <p>Complete operational transparency — all system events logged and traceable</p>
            </div>

            <div className="audit-filter-bar">
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                    <option value="all">All Events</option>
                    <option value="ingestion">Ingestion</option>
                    <option value="risk_score">Risk Score</option>
                    <option value="alert">Alert</option>
                    <option value="intervention">Intervention</option>
                    <option value="access">Access</option>
                </select>
            </div>

            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Type</th>
                        <th>Commodity</th>
                        <th>Region</th>
                        <th>Summary</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(log => (
                        <tr key={log.id}>
                            <td style={{ whiteSpace: 'nowrap' }}>{formatDateTime(log.timestamp)}</td>
                            <td>
                                <span className="audit-type-badge" style={{ background: typeColors[log.type]?.bg, color: typeColors[log.type]?.color }}>
                                    {log.type.replace('_', ' ')}
                                </span>
                            </td>
                            <td>{log.commodity || '—'}</td>
                            <td>{log.region || '—'}</td>
                            <td>{log.summary}</td>
                            <td>{log.user || '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
