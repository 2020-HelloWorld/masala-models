import { getRiskColor, getRiskBgColor, getRiskLabel } from '../../utils/riskLevels';
import './RiskBadge.css';

export default function RiskBadge({ level }) {
    return (
        <span
            className="risk-badge"
            style={{ background: getRiskBgColor(level), color: getRiskColor(level) }}
        >
            {getRiskLabel(level)}
        </span>
    );
}
