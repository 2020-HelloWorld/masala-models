export const mockExplainability = {
    'Onion-MH': {
        summary: 'Onion prices in Maharashtra show high risk of harmful price shock due to transport disruptions and below-normal rainfall creating structural supply stress.',
        contributingFactors: [
            { signalType: 'logistics', description: 'Highway strike affecting major routes from Nashik', contributionPct: 35, baselineValue: 'Normal traffic flow', observedValue: '60% reduction in freight movement' },
            { signalType: 'climate', description: 'Rainfall 40% below seasonal normal for past 14 days', contributionPct: 28, baselineValue: '45mm', observedValue: '27mm' },
            { signalType: 'market', description: 'Mandi prices 25% above seasonal baseline', contributionPct: 22, baselineValue: '₹18/kg', observedValue: '₹22.5/kg' },
            { signalType: 'behavioral', description: 'Historical pattern suggests increased hoarding during transport disruptions', contributionPct: 15, baselineValue: 'Normal buying', observedValue: '1.4x demand multiplier' },
        ],
        structuralAssessment: 'Structural risk — Multiple correlated signals indicate sustained supply stress likely to cause harmful price shock.',
        harmPotential: {
            smallSellers: 'Risk of forced losses if supply chain remains disrupted',
            consumers: 'Risk of artificial scarcity and price gouging in retail markets',
        },
        recommendedActions: [
            'Activate alternative transport routes to restore supply flow',
            'Release buffer stocks in affected regions to prevent artificial scarcity',
            'Monitor retail markets for panic buying and price gouging',
            'Coordinate with wholesalers to prevent hoarding',
        ],
    },
    'Tomato-KA': {
        summary: 'Tomato prices in Karnataka rising due to unseasonal rain damaging crops in Kolar district combined with festival demand.',
        contributingFactors: [
            { signalType: 'climate', description: 'Unseasonal heavy rainfall in Kolar district damaged 30% of standing crop', contributionPct: 42, baselineValue: '5mm', observedValue: '85mm' },
            { signalType: 'market', description: 'Wholesale prices 35% above seasonal baseline at KR Puram APMC', contributionPct: 30, baselineValue: '₹25/kg', observedValue: '₹34/kg' },
            { signalType: 'behavioral', description: 'Festival period driving 1.3x normal demand', contributionPct: 28, baselineValue: 'Normal demand', observedValue: '1.3x demand multiplier' },
        ],
        structuralAssessment: 'Semi-structural risk — Climate damage creates 2-3 week supply gap. Festival demand amplifies short-term pressure.',
        harmPotential: {
            smallSellers: 'Small retailers face margin squeeze from wholesale price surge',
            consumers: 'Urban consumers in Bangalore face 40-50% retail price increase',
        },
        recommendedActions: [
            'Coordinate with Tamil Nadu suppliers for cross-state supply',
            'Facilitate cold storage access for existing inventory',
            'Issue public advisory to manage expectations',
        ],
    },
    'Mustard Oil-RJ': {
        summary: 'Critical supply stress for Mustard Oil in Rajasthan. Export restrictions on rapeseed combined with drought conditions threaten structural shortage.',
        contributingFactors: [
            { signalType: 'event', description: 'Policy change: export restrictions on rapeseed announced', contributionPct: 40, baselineValue: 'Open exports', observedValue: 'Export quota reduced 50%' },
            { signalType: 'climate', description: 'Drought conditions in Jaipur and Alwar divisions for 28 days', contributionPct: 32, baselineValue: '30mm rainfall', observedValue: '8mm rainfall' },
            { signalType: 'market', description: 'Wholesale prices surged 45% in 10 days', contributionPct: 18, baselineValue: '₹145/L', observedValue: '₹210/L' },
            { signalType: 'logistics', description: 'Reduced oil tanker availability due to diesel price hike', contributionPct: 10, baselineValue: '120 tankers/day', observedValue: '85 tankers/day' },
        ],
        structuralAssessment: 'Critical structural risk — Multi-factor convergence with no short-term resolution pathway.',
        harmPotential: {
            smallSellers: 'Small kirana stores face complete stock-out within 5 days',
            consumers: 'Essential cooking oil becoming unaffordable for low-income households',
        },
        recommendedActions: [
            'Immediate buffer stock release from central reserves',
            'Coordinate with Gujarat refineries for emergency supply',
            'Recommend temporary import facilitation for palm oil alternatives',
            'Deploy retail price monitoring teams in major cities',
        ],
    },
};
