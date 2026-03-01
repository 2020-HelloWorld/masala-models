// Generate mock signal data for charts
export function generateSignalData(commodity, regionCode, signalType, days = 90) {
    const seed = commodity.length * 7 + regionCode.charCodeAt(0) * 3 + signalType.length * 11;
    let s = seed;
    const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };

    const data = [];
    let baseline = 40 + r() * 30;
    let observed = baseline;

    for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        // Slowly evolve baseline with seasonal pattern
        baseline = baseline + Math.sin(i / 15) * 2 + (r() - 0.5) * 1;
        baseline = Math.max(10, Math.min(90, baseline));

        // Observed deviates from baseline
        observed = baseline + (r() - 0.4) * 15;
        observed = Math.max(5, Math.min(100, observed));

        const baselineMin = Math.max(0, baseline - 8);
        const baselineMax = Math.min(100, baseline + 8);

        data.push({
            date: date.toISOString().split('T')[0],
            observed: Math.round(observed * 10) / 10,
            baseline: Math.round(baseline * 10) / 10,
            baselineMin: Math.round(baselineMin * 10) / 10,
            baselineMax: Math.round(baselineMax * 10) / 10,
            deviation: Math.round((observed - baseline) * 10) / 10,
        });
    }
    return data;
}
