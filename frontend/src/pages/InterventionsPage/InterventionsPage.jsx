import { Plus } from 'lucide-react';
import MetricWidget from '../../components/MetricWidget/MetricWidget';
import { mockInterventions } from '../../mocks/mockInterventions';
import { formatDateTime } from '../../utils/formatters';
import './InterventionsPage.css';

export default function InterventionsPage() {
    const avgReduction = Math.round(mockInterventions.reduce((s, i) => s + i.effectiveness.riskReduction, 0) / mockInterventions.length);
    const avgLead = (mockInterventions.reduce((s, i) => s + i.effectiveness.leadTimeDays, 0) / mockInterventions.length).toFixed(1);

    return (
        <div className="interventions-page">
            <div className="page-header">
                <h1>Interventions</h1>
                <p>Record preventive interventions and track their effectiveness in preventing harm</p>
            </div>

            <div className="interventions-top">
                <MetricWidget label="Total Interventions" value={mockInterventions.length} color="var(--color-accent-hover)" />
                <MetricWidget label="Avg. Risk Reduction" value={avgReduction} unit="pts" color="var(--color-risk-low)" />
                <MetricWidget label="Avg. Lead Time" value={avgLead} unit="days" color="var(--color-link)" />
            </div>

            <div className="interventions-header">
                <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>Intervention Records</h2>
                <button className="btn-primary"><Plus size={16} /> Record Intervention</button>
            </div>

            <table className="interventions-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Commodity</th>
                        <th>Region</th>
                        <th>Date</th>
                        <th>Risk Reduction</th>
                        <th>Price Stab.</th>
                        <th>Harm Prevented</th>
                    </tr>
                </thead>
                <tbody>
                    {mockInterventions.map(int => (
                        <tr key={int.id}>
                            <td style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{int.type}</td>
                            <td>{int.commodity}</td>
                            <td>{int.regionName}</td>
                            <td>{formatDateTime(int.recordedAt)}</td>
                            <td className="eff-positive">-{int.effectiveness.riskReduction} pts</td>
                            <td className="eff-positive">-{int.effectiveness.priceStabilization}%</td>
                            <td style={{ fontSize: 'var(--font-size-xs)' }}>{int.effectiveness.harmPrevented}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
