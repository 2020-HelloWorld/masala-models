import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertCard from '../../components/AlertCard/AlertCard';
import { mockAlerts } from '../../mocks/mockAlerts';
import './AlertsPage.css';

export default function AlertsPage() {
    const navigate = useNavigate();
    const [levelFilter, setLevelFilter] = useState('all');
    const [commodityFilter, setCommodityFilter] = useState('all');

    const filtered = useMemo(() => {
        return mockAlerts.filter(a => {
            if (levelFilter !== 'all' && a.riskLevel !== levelFilter) return false;
            if (commodityFilter !== 'all' && a.commodity !== commodityFilter) return false;
            return true;
        });
    }, [levelFilter, commodityFilter]);

    const commodities = [...new Set(mockAlerts.map(a => a.commodity))];

    return (
        <div className="alerts-page">
            <div className="page-header">
                <h1>Alerts</h1>
                <p>Early warning alerts for potential harmful price shocks across essential goods</p>
            </div>

            <div className="alerts-filter-bar">
                <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
                    <option value="all">All Levels</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="moderate">Moderate</option>
                    <option value="low">Low</option>
                </select>
                <select value={commodityFilter} onChange={e => setCommodityFilter(e.target.value)}>
                    <option value="all">All Commodities</option>
                    {commodities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="alerts-count">{filtered.length} alert{filtered.length !== 1 ? 's' : ''}</div>

            <div className="alerts-list">
                {filtered.map(alert => (
                    <AlertCard
                        key={alert.id}
                        alert={alert}
                        onClick={() => navigate(`/risk/${encodeURIComponent(alert.commodity)}/${alert.region}`)}
                    />
                ))}
                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-tertiary)' }}>
                        No alerts match your filters.
                    </div>
                )}
            </div>
        </div>
    );
}
