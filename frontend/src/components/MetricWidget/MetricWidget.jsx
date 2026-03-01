import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './MetricWidget.css';

export default function MetricWidget({ label, value, unit, footer, color, glow, icon, trendTag, chartData }) {
    return (
        <motion.div
            className={`metric-widget ${glow ? 'glow' : ''}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ '--widget-color': color }}
        >
            <div className="metric-widget-header">
                {icon && (
                    <div className="metric-widget-icon" style={{ background: `color-mix(in srgb, var(--widget-color) 15%, transparent)`, color }}>
                        {icon}
                    </div>
                )}
                {trendTag && (
                    <div className="metric-widget-tag" style={{ background: `color-mix(in srgb, var(--widget-color) 15%, transparent)`, color }}>
                        {trendTag}
                    </div>
                )}
            </div>

            <div className="metric-widget-content">
                <span className="metric-widget-label">{label}</span>
                <span className="metric-widget-value" style={{ color }}>
                    {value}
                    {unit && <span className="metric-widget-unit">{unit}</span>}
                </span>
                {footer && <div className="metric-widget-footer">{footer}</div>}
            </div>

            {chartData && (
                <div className="metric-widget-chart">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <Line type="basis" dataKey="value" stroke={color} strokeWidth={2.5} dot={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    );
}
