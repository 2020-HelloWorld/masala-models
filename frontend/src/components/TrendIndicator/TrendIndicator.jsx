import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './TrendIndicator.css';

export default function TrendIndicator({ trend }) {
    const icons = {
        rising: <TrendingUp size={14} />,
        falling: <TrendingDown size={14} />,
        stable: <Minus size={14} />,
    };

    const labels = {
        rising: 'Rising',
        falling: 'Falling',
        stable: 'Stable',
    };

    return (
        <span className={`trend-indicator ${trend}`}>
            {icons[trend]}
            {labels[trend]}
        </span>
    );
}
