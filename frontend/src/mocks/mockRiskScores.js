import { COMMODITIES, REGIONS } from '../utils/constants';
import { getRiskLevel } from '../utils/riskLevels';

function seededRandom(seed) {
    let s = seed;
    return function () {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

const rand = seededRandom(42);

function randomBetween(min, max) {
    return Math.floor(rand() * (max - min + 1)) + min;
}

const trends = ['rising', 'stable', 'falling'];

export const mockRiskScores = [];

COMMODITIES.forEach((commodity) => {
    REGIONS.forEach((region) => {
        const combined = randomBetween(5, 95);
        const supplyStress = randomBetween(5, 95);
        const priceShock = randomBetween(5, 95);
        const level = getRiskLevel(combined);
        const trend = trends[randomBetween(0, 2)];
        const significantChange = rand() > 0.8;

        mockRiskScores.push({
            commodity,
            region: region.code,
            regionName: region.name,
            combinedScore: combined,
            supplyStressScore: supplyStress,
            priceShockScore: priceShock,
            riskLevel: level,
            trend,
            significantChange,
            timestamp: new Date().toISOString(),
        });
    });
});

// Generate history for a given commodity-region pair (past 90 days)
export function generateRiskHistory(commodity, regionCode) {
    const r = seededRandom(commodity.length * 100 + regionCode.charCodeAt(0));
    const rr = () => { const s = r(); return s; };
    const history = [];
    let base = 30 + Math.floor(rr() * 40);

    for (let i = 90; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        base = Math.max(5, Math.min(95, base + Math.floor((rr() - 0.48) * 12)));
        history.push({
            date: date.toISOString().split('T')[0],
            combinedScore: base,
            supplyStressScore: Math.max(5, Math.min(95, base + Math.floor((rr() - 0.5) * 20))),
            priceShockScore: Math.max(5, Math.min(95, base + Math.floor((rr() - 0.5) * 20))),
            riskLevel: getRiskLevel(base),
        });
    }
    return history;
}
