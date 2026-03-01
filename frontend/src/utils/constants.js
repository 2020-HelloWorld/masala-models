export const COMMODITIES = [
    'Onion', 'Tomato', 'Potato', 'Rice', 'Wheat',
    'Dal (Tur)', 'Sugar', 'Mustard Oil', 'Milk', 'Green Chilli',
];

export const REGIONS = [
    { code: 'MH', name: 'Maharashtra' },
    { code: 'KA', name: 'Karnataka' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'RJ', name: 'Rajasthan' },
    { code: 'GJ', name: 'Gujarat' },
    { code: 'PB', name: 'Punjab' },
    { code: 'WB', name: 'West Bengal' },
    { code: 'BR', name: 'Bihar' },
];

export const SIGNAL_TYPES = [
    { key: 'market', label: 'Market', color: 'var(--color-signal-market)' },
    { key: 'logistics', label: 'Logistics', color: 'var(--color-signal-logistics)' },
    { key: 'climate', label: 'Climate', color: 'var(--color-signal-climate)' },
    { key: 'behavioral', label: 'Behavioral', color: 'var(--color-signal-behavioral)' },
    { key: 'event', label: 'Event', color: 'var(--color-signal-event)' },
];

export const RISK_THRESHOLDS = {
    LOW_MAX: 25,
    MODERATE_MAX: 50,
    HIGH_MAX: 75,
    CRITICAL_MAX: 100,
};

export const INTERVENTION_TYPES = [
    'Buffer Stock Release',
    'Alternative Transport Route',
    'Retail Monitoring',
    'Wholesale Coordination',
    'Import Facilitation',
    'Public Advisory',
    'Price Cap Recommendation',
    'Cold Storage Activation',
];
