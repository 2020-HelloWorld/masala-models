// Risk level utilities
export const RISK_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  CRITICAL: 'critical',
};

export function getRiskLevel(score) {
  if (score <= 25) return RISK_LEVELS.LOW;
  if (score <= 50) return RISK_LEVELS.MODERATE;
  if (score <= 75) return RISK_LEVELS.HIGH;
  return RISK_LEVELS.CRITICAL;
}

export function getRiskColor(level) {
  const colors = {
    low: 'var(--color-risk-low)',
    moderate: 'var(--color-risk-moderate)',
    high: 'var(--color-risk-high)',
    critical: 'var(--color-risk-critical)',
  };
  return colors[level] || colors.low;
}

export function getRiskBgColor(level) {
  const colors = {
    low: 'var(--color-risk-low-bg)',
    moderate: 'var(--color-risk-moderate-bg)',
    high: 'var(--color-risk-high-bg)',
    critical: 'var(--color-risk-critical-bg)',
  };
  return colors[level] || colors.low;
}

export function getRiskLabel(level) {
  const labels = {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    critical: 'Critical',
  };
  return labels[level] || 'Unknown';
}
