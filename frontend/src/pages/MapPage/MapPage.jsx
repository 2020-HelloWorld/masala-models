import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { mockRiskScores } from '../../mocks/mockRiskScores';
import { COMMODITIES, REGIONS } from '../../utils/constants';
import { getRiskLevel } from '../../utils/riskLevels';
import './MapPage.css';

const INDIA_TOPO_URL = '/india-states-min.json';

// Map state names from GeoJSON to our region codes
const STATE_TO_CODE = {
    'maharashtra': 'MH',
    'karnataka': 'KA',
    'tamil nadu': 'TN',
    'uttar pradesh': 'UP',
    'madhya pradesh': 'MP',
    'rajasthan': 'RJ',
    'gujarat': 'GJ',
    'punjab': 'PB',
    'west bengal': 'WB',
    'bihar': 'BR',
};

const riskColors = {
    low: { fill: '#34D399', stroke: '#059669', glow: 'rgba(52,211,153,0.35)' },
    moderate: { fill: '#FBBF24', stroke: '#D97706', glow: 'rgba(251,191,36,0.35)' },
    high: { fill: '#FB923C', stroke: '#EA580C', glow: 'rgba(251,146,60,0.35)' },
    critical: { fill: '#F87171', stroke: '#DC2626', glow: 'rgba(248,113,113,0.4)' },
};

export default function MapPage() {
    const navigate = useNavigate();
    const [hoveredState, setHoveredState] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [selectedCommodity, setSelectedCommodity] = useState('all');

    const stateRisks = useMemo(() => {
        const result = {};
        Object.values(STATE_TO_CODE).forEach(code => {
            let relevantScores = mockRiskScores.filter(r => r.region === code);
            if (selectedCommodity !== 'all') {
                relevantScores = relevantScores.filter(r => r.commodity === selectedCommodity);
            }
            const avg = relevantScores.length
                ? Math.round(relevantScores.reduce((s, r) => s + r.combinedScore, 0) / relevantScores.length)
                : 0;
            const topCommodity = [...relevantScores].sort((a, b) => b.combinedScore - a.combinedScore)[0];
            result[code] = { avg, level: getRiskLevel(avg), topCommodity };
        });
        return result;
    }, [selectedCommodity]);

    const handleMouseMove = (e) => {
        setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    return (
        <motion.div className="map-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="map-header">
                <div>
                    <h1>Geographic Risk Distribution</h1>
                    <p>State-level risk visualization across India's essential goods supply chain</p>
                </div>
                <select
                    value={selectedCommodity}
                    onChange={e => setSelectedCommodity(e.target.value)}
                    className="map-commodity-select"
                >
                    <option value="all">All Commodities</option>
                    {COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="map-layout">
                {/* Map */}
                <div className="map-svg-container" onMouseMove={handleMouseMove}>
                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 1000,
                            center: [82, 22],
                        }}
                        width={600}
                        height={600}
                        style={{ width: '100%', height: 'auto' }}
                    >
                        <Geographies geography={INDIA_TOPO_URL}>
                            {({ geographies }) =>
                                geographies.map(geo => {
                                    const stateName = (geo.properties.st_nm || geo.properties.NAME_1 || geo.properties.name || '').toLowerCase();
                                    const code = STATE_TO_CODE[stateName];
                                    const risk = code ? stateRisks[code] : null;
                                    const colors = risk ? riskColors[risk.level] : null;
                                    const isHovered = hoveredState === stateName;
                                    const isMonitored = !!code;

                                    return (
                                        <Geography
                                            key={geo.rpiKey || geo.id || stateName}
                                            geography={geo}
                                            onMouseEnter={() => setHoveredState(stateName)}
                                            onMouseLeave={() => setHoveredState(null)}
                                            onClick={() => {
                                                if (risk?.topCommodity) {
                                                    navigate(`/risk/${encodeURIComponent(risk.topCommodity.commodity)}/${code}`);
                                                }
                                            }}
                                            style={{
                                                default: {
                                                    fill: isMonitored ? colors.fill : 'rgba(15, 23, 42, 0.04)',
                                                    fillOpacity: isMonitored ? 0.25 : 1,
                                                    stroke: isMonitored ? colors.stroke : 'rgba(15, 23, 42, 0.1)',
                                                    strokeWidth: isMonitored ? 0.8 : 0.3,
                                                    cursor: isMonitored ? 'pointer' : 'default',
                                                    outline: 'none',
                                                    transition: 'all 200ms ease',
                                                },
                                                hover: {
                                                    fill: isMonitored ? colors.fill : 'rgba(15, 23, 42, 0.08)',
                                                    fillOpacity: isMonitored ? 0.55 : 1,
                                                    stroke: isMonitored ? colors.stroke : 'rgba(15, 23, 42, 0.15)',
                                                    strokeWidth: isMonitored ? 1.5 : 0.5,
                                                    cursor: isMonitored ? 'pointer' : 'default',
                                                    outline: 'none',
                                                    filter: isMonitored ? `drop-shadow(0 0 8px ${colors.glow})` : 'none',
                                                },
                                                pressed: { outline: 'none' },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ComposableMap>

                    {/* Tooltip */}
                    {hoveredState && (() => {
                        const code = STATE_TO_CODE[hoveredState];
                        const risk = code ? stateRisks[code] : null;
                        const regionInfo = REGIONS.find(r => r.code === code);
                        const displayName = regionInfo?.name || hoveredState.replace(/\b\w/g, l => l.toUpperCase());
                        return (
                            <div className="map-tooltip" style={{ left: tooltipPos.x + 16, top: tooltipPos.y - 20 }}>
                                <div className="map-tooltip-name">{displayName}</div>
                                {risk ? (
                                    <>
                                        <div className="map-tooltip-score" style={{ color: riskColors[risk.level].fill }}>
                                            Score: {risk.avg}/100
                                        </div>
                                        {risk.topCommodity && (
                                            <div className="map-tooltip-detail">
                                                Top risk: {risk.topCommodity.commodity} ({risk.topCommodity.combinedScore})
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="map-tooltip-detail">Not monitored</div>
                                )}
                            </div>
                        );
                    })()}
                </div>

                {/* Side panel */}
                <div className="map-details-panel">
                    <h3>State Risk Summary</h3>
                    <div className="map-states-list">
                        {Object.entries(stateRisks)
                            .sort((a, b) => b[1].avg - a[1].avg)
                            .map(([code, risk]) => {
                                const colors = riskColors[risk.level];
                                const regionInfo = REGIONS.find(r => r.code === code);
                                return (
                                    <div
                                        key={code}
                                        className={`map-state-row ${hoveredState === Object.entries(STATE_TO_CODE).find(([, v]) => v === code)?.[0] ? 'hovered' : ''}`}
                                        onMouseEnter={() => {
                                            const entry = Object.entries(STATE_TO_CODE).find(([, v]) => v === code);
                                            if (entry) setHoveredState(entry[0]);
                                        }}
                                        onMouseLeave={() => setHoveredState(null)}
                                        onClick={() => {
                                            if (risk.topCommodity) navigate(`/risk/${encodeURIComponent(risk.topCommodity.commodity)}/${code}`);
                                        }}
                                    >
                                        <div className="map-state-bar" style={{ background: colors.fill, width: `${risk.avg}%` }} />
                                        <div className="map-state-info">
                                            <div>
                                                <span className="map-state-code">{regionInfo?.name || code}</span>
                                                <span className="map-state-commodity">
                                                    {risk.topCommodity ? `${risk.topCommodity.commodity} (${risk.topCommodity.combinedScore})` : '—'}
                                                </span>
                                            </div>
                                            <span className="map-state-score" style={{ color: colors.fill }}>{risk.avg}</span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="map-legend-section">
                        <h4>Risk Levels</h4>
                        <div className="map-legend-grid">
                            {Object.entries(riskColors).map(([level, { fill }]) => (
                                <div key={level} className="map-legend-entry">
                                    <span className="map-legend-swatch" style={{ background: fill }} />
                                    <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
