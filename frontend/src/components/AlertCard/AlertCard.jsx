import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, AlertCircle, AlertTriangle, Info, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDateTime } from '../../utils/formatters';
import './AlertCard.css';

const getLevelIcon = (level) => {
    switch (level) {
        case 'critical': return <AlertCircle size={18} />;
        case 'high': return <AlertTriangle size={18} />;
        case 'moderate': return <BellRing size={16} />;
        default: return <Info size={16} />;
    }
};

export default function AlertCard({ alert, onClick, compact }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = (e) => {
        e.stopPropagation();
        setExpanded(!expanded);
    }

    return (
        <motion.div
            className={`alert-card ${alert.riskLevel} ${!alert.isRead ? 'unread' : ''} ${compact ? 'compact' : ''}`}
            onClick={() => onClick?.(alert)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="alert-card-inner">
                <div className={`alert-card-icon-solid bg-${alert.riskLevel}`}>
                    {getLevelIcon(alert.riskLevel)}
                </div>

                <div className="alert-card-content">
                    <div className="alert-card-header">
                        <div className="alert-card-title">
                            <span>{alert.commodity}</span>
                            <span className="alert-card-region">· {alert.regionName}</span>
                        </div>
                        <div className="alert-card-meta">
                            <span className={`alert-solid-badge bg-${alert.riskLevel}`}>
                                {alert.riskLevel.toUpperCase()}
                            </span>
                            <span className="alert-lead-time">
                                {alert.leadTimeEstimate}d
                            </span>
                        </div>
                    </div>

                    <div className={`alert-card-summary-wrapper ${expanded ? 'expanded' : ''}`}>
                        <p className="alert-card-summary">{alert.summary}</p>
                    </div>

                    {!compact && (
                        <div className="alert-card-footer">
                            <span className="alert-time-full">{formatDateTime(alert.timestamp)}</span>
                            <button className="alert-expand-btn" onClick={toggleExpand}>
                                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {expanded && !compact && alert.recommendedActions?.length > 0 && (
                    <motion.div
                        className="alert-card-actions-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <strong>Suggested Actions:</strong>
                        <div className="alert-card-actions">
                            {alert.recommendedActions.map((action, i) => (
                                <span key={i} className="alert-action-chip">{action}</span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
