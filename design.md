# Design Document: National Price Shock Protection and Stabilization System for Essential Goods

## Overview

The National Price Shock Protection and Stabilization System is a decision-support AI and early-warning risk intelligence layer designed to prevent harmful price shocks of essential goods before they impact small sellers and consumers in India. The system is not an analytics platform, an automated price controller, or a market manipulation tool. It is a protection system focused on essential goods market stabilization.

The system's purpose is to prevent harmful price shocks, not merely to forecast prices or monitor supply. It addresses the fundamental challenge of distinguishing temporary volatility (noise) from structural supply stress (true risk) in fragmented Indian supply chains. This distinction is critical to avoid panic amplification and overreaction to normal market fluctuations.

The system combines live signals with baseline seasonal models, applies lag-aware smoothing and confidence weighting, and produces explainable risk assessments that enable targeted, proportionate, region-specific stabilization interventions. It protects small sellers from forced losses and consumers from artificial scarcity by providing early warning of price shock risks.

The architecture follows a layered approach:

1. Ingestion Layer: Collects signals from market, logistics, climate, behavioral, and event sources
2. Processing Layer: Normalizes signals, computes baselines, detects deviations
3. Intelligence Layer: Fuses signals, scores price shock risk, generates explanations
4. Decision Layer: Delivers alerts, visualizations, and intervention tracking

The system is designed for essential commodities across mandi and e-commerce hybrid markets, with explicit focus on harm prevention and market stabilization.

## Design Principles

The system is built on core principles that distinguish it from reactive analytics platforms:

### Multi-Signal Convergence Requirement

The system requires convergence of multiple signals before raising high risk scores. Single-event reactions are dampened to prevent panic amplification. High risk scores are generated only when:
- Multiple signal types show correlated deviations
- Deviations persist across multiple time periods
- Structural factors align with live signals

This prevents overreaction to isolated events and ensures alerts indicate true systemic risk.

### Live and Slow Signal Blending

The system blends two types of signals:
- **Live signals**: Market prices, transport disruptions, news events (rapid changes)
- **Slow-moving signals**: Climate patterns, seasonal baselines, behavioral trends (gradual changes)

Live signals provide early warning of emerging shocks. Slow signals provide context to distinguish temporary volatility from structural stress. The fusion engine weights these signals dynamically:
- When live signals show sudden change without slow signal support, confidence is reduced
- When slow signals show structural shift, live signal deviations are amplified
- When both align, risk scores increase significantly

This blending prevents panic amplification by requiring structural confirmation before escalating risk.

### Noise Dampening and Smoothing

The system applies lag-aware smoothing to all signals and risk scores to filter short-term noise. This prevents:
- False alarms from temporary price spikes
- Overreaction to single-day events
- Panic-driven feedback loops

Smoothing parameters are tuned to balance responsiveness with stability, ensuring the system detects true structural risks while ignoring normal market volatility.

### Explainability Over Black-Box Prediction

The system prioritizes explainable risk assessments over black-box predictions. Every risk score is accompanied by:
- Contributing signals ranked by impact
- Baseline vs observed value comparisons
- Structural vs temporary assessment
- Recommended proportionate actions

This enables decision-makers to understand why a price shock is likely and what stabilizing actions are appropriate, rather than blindly following algorithmic recommendations.

### Harm Prevention Focus

The system is designed to prevent harm to vulnerable market participants:
- **Small sellers**: Protected from forced losses due to sudden price collapses or supply disruptions
- **Consumers**: Protected from artificial scarcity and price gouging
- **Market stability**: Maintained through early intervention before crises escalate

Success is measured not by prediction accuracy alone, but by harm prevented and price stabilization achieved.

### Non-Intervention in Price Setting

The system does NOT:
- Set prices or price controls
- Manipulate markets or trading
- Automatically trigger interventions
- Replace human decision-making

It is a decision-support and early-warning system only. All interventions are taken by human stakeholders based on system recommendations.

## Why This Is Not a Price Prediction or Price Control System

This system is fundamentally different from price forecasting platforms, trading systems, or price control mechanisms. Understanding these distinctions is critical to its proper use and interpretation.

### Distinguishing Temporary Volatility from Structural Stress

The system does not react to every price change. It distinguishes between:

**Temporary Volatility (Noise)**:
- Single-day price spikes
- Isolated events without structural causes
- Normal seasonal fluctuations
- Short-term supply-demand imbalances

**Structural Stress (True Risk)**:
- Sustained deviations from baseline patterns
- Multiple correlated signal types indicating systemic issues
- Persistent supply chain disruptions
- Convergence of live and slow-moving signals

The system filters temporary volatility through lag-aware smoothing and requires sustained deviations before raising risk scores. This prevents panic amplification and false alarms.

### Multi-Signal Convergence Prevents Overreaction

Unlike single-indicator systems, this system requires convergence of multiple signals before indicating high risk:

- A single price spike without supporting signals → Low risk (likely noise)
- Price spike + transport disruption → Moderate risk (emerging concern)
- Price spike + transport disruption + rainfall deficit + hoarding pattern → High risk (structural threat)

This multi-signal requirement prevents overreaction to isolated events and ensures alerts indicate true systemic risk, not normal market fluctuations.

### Live and Slow Signal Blending

The system blends two types of signals with different temporal characteristics:

**Live Signals** (rapid changes):
- Market prices (daily updates)
- Transport disruptions (event-driven)
- News events (real-time)

**Slow Signals** (gradual changes):
- Climate patterns (seasonal)
- Baseline models (historical)
- Behavioral trends (cyclical)

When live signals show sudden change without slow signal support, the system reduces confidence, treating it as potential noise. When slow signals show structural shift, live signal deviations are amplified, indicating confirmed risk. This blending prevents panic while maintaining responsiveness to true threats.

### Explainability Over Black-Box Prediction

The system prioritizes explainable risk assessments over black-box predictions:

**What the system provides**:
- Contributing signals ranked by impact
- Baseline vs observed value comparisons
- Structural vs temporary assessment
- Recommended proportionate actions
- Clear reasoning for risk scores

**What the system does NOT provide**:
- Opaque algorithmic predictions
- Unexplained risk scores
- Automated trading signals
- Price targets or forecasts

Decision-makers understand why a price shock is likely and what stabilizing actions are appropriate, rather than blindly following algorithmic recommendations.

### The System Does Not Set or Manipulate Prices

The system is a decision-support and early-warning tool only:

**What the system does**:
- Detects emerging price shock risks
- Explains causes of structural stress
- Recommends proportionate stabilization actions
- Tracks intervention effectiveness

**What the system does NOT do**:
- Set prices or price controls
- Execute trades or market operations
- Automatically trigger interventions
- Replace human decision-making
- Manipulate markets

All interventions are taken by human stakeholders (government agencies, wholesalers, retailers) based on system recommendations. The system provides intelligence, not control.

## Architecture

### System Components

The system consists of four primary layers:

**Ingestion Layer**
- Signal collectors for each data source type
- Data validation and quality checks
- Ingestion queues for buffering and reliability
- Source-specific adapters for heterogeneous data formats

**Processing Layer**
- Signal normalization engine
- Baseline seasonal model computation
- Deviation detection engine
- Historical data store
- Time-series processing pipeline

**Intelligence Layer**
- Signal fusion engine
- Risk scoring engine
- Explainability generator
- Confidence weighting module
- Noise dampening module

**Decision Layer**
- Alert generation and delivery
- Dashboard and visualization service
- Intervention tracking service
- Audit logging service
- Access control service

### Data Flow

1. Raw signals enter through source-specific collectors
2. Signals are validated and queued in the ingestion layer
3. Normalized signals are stored and passed to the processing layer
4. Processing layer computes deviation scores against baseline models
5. Intelligence layer fuses deviation scores into unified risk assessments
6. Decision layer generates alerts, updates dashboards, and logs all operations
7. Stakeholders interact through dashboard or receive alerts
8. Interventions are recorded and tracked for effectiveness measurement

### Technology Stack

**Data Ingestion**
- Message queue system for reliable signal ingestion (Apache Kafka or AWS Kinesis)
- API gateways for external data sources
- Scheduled batch processors for periodic data sources
- Stream processors for real-time signals

**Storage**
- Time-series database for signal history (InfluxDB or TimescaleDB)
- Relational database for structured data (PostgreSQL)
- Document store for unstructured data like news (MongoDB or Elasticsearch)
- Object storage for raw data archives (S3 or equivalent)

**Processing**
- Stream processing framework (Apache Flink or Spark Streaming)
- Batch processing framework (Apache Spark)
- Statistical computing environment (Python with NumPy, SciPy, pandas)
- Machine learning framework (scikit-learn, PyTorch for NLP)

**Analytics and ML**
- Time-series analysis libraries (statsmodels, Prophet)
- NLP libraries for news classification (spaCy, Hugging Face Transformers)
- Anomaly detection libraries (PyOD)
- Explainability libraries (SHAP, LIME)

**Dashboard**
- Web application framework (React or Vue.js)
- Visualization libraries (D3.js, Plotly)
- Mapping libraries (Leaflet, Mapbox)
- API layer (FastAPI or Express.js)

**Infrastructure**
- Container orchestration (Kubernetes)
- Cloud platform (AWS, Azure, or GCP)
- Monitoring and observability (Prometheus, Grafana)
- Logging (ELK stack or CloudWatch)

## Components and Interfaces

### Signal Collectors

Each signal type has a dedicated collector component:

**Mandi Price Collector**
- Connects to government mandi APIs or data feeds
- Polls for daily price updates
- Handles missing data and delayed reporting
- Outputs: commodity, region, date, price, volume

**Wholesale Price Index Collector**
- Connects to government statistical APIs
- Retrieves periodic index updates
- Outputs: commodity, date, index_value

**E-commerce Price Collector**
- Scrapes or connects to e-commerce platform APIs
- Samples prices for essential goods
- Handles regional variations
- Outputs: commodity, region, date, price, platform

**Transport Disruption Collector**
- Monitors news sources and social media
- Filters for transport-related content
- Outputs: date, region, text, source

Note: Transport disruption is a derived signal computed from multiple sources:
- News classification (strikes, protests, road closures)
- Mobility trend data (reduced movement patterns)
- Railway delay data (freight disruptions)
These sources are combined to produce a composite transport disruption signal with confidence weighting based on source agreement.

**Mobility Trend Collector**
- Connects to mobility data providers
- Retrieves regional movement patterns
- Outputs: region, date, mobility_index

**Railway Delay Collector**
- Connects to railway information systems
- Retrieves delay and disruption data
- Outputs: route, date, delay_minutes

**Climate Signal Collectors**
- Connect to meteorological data sources
- Retrieve rainfall, temperature, and alert data
- Outputs: region, date, rainfall_mm, temperature_c, alert_type

**Behavioral Signal Collectors**
- Maintain festival calendar database
- Analyze historical hoarding patterns
- Outputs: date, region, event_type, demand_multiplier

### Signal Normalization Engine

Converts heterogeneous signals into a unified schema:

**Input**: Raw signal from any collector
**Output**: Normalized signal with fields:
- signal_id: unique identifier
- signal_type: market, logistics, climate, behavioral, event
- timestamp: ISO 8601 datetime
- region: standardized region code
- commodity: standardized commodity code
- value: numerical or categorical value
- confidence: 0.0 to 1.0 confidence weight
- metadata: additional context

**Processing**:
- Schema validation against signal type
- Timestamp standardization
- Region and commodity code mapping
- Missing field handling (defaults or null markers)
- Confidence assignment based on source reliability and data completeness
- Deduplication based on content similarity

### Baseline Seasonal Model Engine

Computes and maintains baseline models for each commodity-region pair:

**Model Type**: Seasonal decomposition with trend, seasonal, and residual components

**Inputs**:
- Historical price signals (minimum 2 years)
- Historical volume signals
- Known seasonal events (festivals, harvest cycles)

**Outputs**:
- Expected value range for each day of year
- Seasonal pattern coefficients
- Trend coefficients
- Residual variance

**Processing**:
- Remove historical anomalies using outlier detection
- Decompose time series into trend, seasonal, and residual
- Fit seasonal patterns using Fourier series or similar
- Compute expected ranges as mean ± 2 standard deviations
- Update models incrementally as new data arrives
- Maintain separate models for price and volume

**Model Storage**: Models stored as serialized objects with versioning

### Deviation Detection Engine

Computes deviation scores for incoming signals:

**Inputs**:
- Normalized signal
- Corresponding baseline model

**Outputs**:
- Deviation score: -100 to +100 (negative for below baseline, positive for above)
- Deviation magnitude: absolute difference from baseline
- Baseline value: expected value from model
- Observed value: actual signal value
- Structural flag: boolean indicating sustained deviation

**Processing**:
- Retrieve baseline model for signal's commodity-region-date
- Compute raw deviation: (observed - expected) / expected_range
- Apply lag-aware smoothing using exponential moving average
- Check for sustained deviations: multiple consecutive signals in same direction
- Set structural flag if deviation persists beyond threshold duration
- Scale deviation to -100 to +100 range

**Smoothing Parameters**:
- Short-term window: 3 days for noise filtering
- Medium-term window: 7 days for trend detection
- Long-term window: 14 days for structural risk identification

### News Classification Engine

Classifies news and event text into categories:

**Inputs**:
- News text
- Metadata (source, date, region)

**Outputs**:
- Category: strike, policy_announcement, export_ban, protest, flood, drought, other
- Confidence: 0.0 to 1.0
- Extracted entities: regions, commodities, dates
- Sentiment: negative, neutral, positive

**Processing**:
- Text preprocessing (tokenization, normalization)
- Named entity recognition for regions and commodities
- Classification using fine-tuned transformer model
- Confidence thresholding (reject if confidence < 0.6)
- Entity extraction and validation against known lists

**Model**: Fine-tuned BERT or similar transformer on labeled corpus of Indian agricultural news

### Signal Fusion Engine

Combines deviation scores into unified price shock risk assessments:

**Inputs**:
- Deviation scores from all signal types for a commodity-region pair
- Confidence weights for each signal
- Historical risk scores

**Outputs**:
- Supply stress risk score: 0 to 100
- Price shock risk score: 0 to 100 (formerly "price instability")
- Combined risk score: 0 to 100
- Contributing signals: list of signals with contribution percentages

**Fusion Logic**:

1. **Signal Weighting**: Weight each deviation score by its confidence and relevance
   - Market signals: high weight for price shock risk, medium for supply stress
   - Logistics signals: high weight for supply stress, medium for price shock risk
   - Climate signals: medium weight for both, higher during growing season
   - Behavioral signals: medium weight for price shock risk
   - Event signals: weight varies by event type

2. **Temporal Blending**: Combine live and slow-moving signals
   - Live signals (market, logistics, events): higher weight for recent data
   - Slow signals (climate, behavioral): higher weight for sustained patterns
   - When live signals show sudden change without slow signal support, reduce confidence to prevent panic amplification
   - When slow signals show structural shift, increase weight permanently to indicate systemic risk
   - When both align, amplify risk score significantly to indicate convergent structural threat

3. **Noise Dampening**: Filter short-term fluctuations to avoid overreaction
   - Require multiple correlated signals before increasing risk score significantly
   - Apply exponential smoothing to risk score updates
   - Ignore isolated spikes unless accompanied by structural signals
   - Single-event reactions are dampened; multi-signal convergence is required for high risk

4. **Correlation Amplification**: Boost risk when signals indicate systemic risk
   - If market and logistics signals both deviate, amplify combined risk (indicates supply chain breakdown)
   - If climate and behavioral signals align, amplify combined risk (indicates structural scarcity)
   - Use correlation matrix to determine amplification factors
   - Correlated signals indicate systemic risk rather than normal fluctuation

5. **Risk Score Computation**:
   - Supply stress score = weighted sum of logistics, climate, and event deviations
   - Price shock risk score = weighted sum of market, behavioral, and event deviations (focus on consumer harm and artificial scarcity)
   - Combined score = max(supply_stress, price_shock_risk) with correlation boost
   - Scores reflect likelihood of harmful price shocks, not mere price changes

6. **Smoothing**: Apply exponential moving average to prevent score volatility
   - Alpha = 0.3 for daily updates (70% previous, 30% new)
   - Higher alpha during confirmed structural events

**Confidence Weighting Factors**:
- Source reliability: government data (1.0), commercial data (0.8), social media (0.5)
- Data completeness: complete (1.0), partial (0.7), sparse (0.4)
- Timeliness: current day (1.0), 1-3 days old (0.9), >3 days old (0.7)
- Historical accuracy: track record of signal's predictive value

### Risk Scoring Engine

Classifies price shock risk scores into levels and identifies significant changes:

**Inputs**:
- Current risk scores from fusion engine
- Historical risk scores

**Outputs**:
- Risk level: low, moderate, high, critical
- Trend: rising, stable, falling
- Significant change flag: boolean
- Projected trajectory: forecast for next 7 days

**Processing**:
- Map risk score to level using thresholds (0-25 low, 26-50 moderate, 51-75 high, 76-100 critical)
- Compute trend from recent score history (linear regression over 7 days)
- Flag significant change if score changed >10 points in one update (indicates rapid escalation of price shock risk)
- Project trajectory using trend and current signals
- Prioritize essential goods with high impact on small sellers and consumers (focus on harm prevention)
- Assess whether risk indicates temporary volatility or structural market instability

### Explainability Generator

Produces human-readable explanations of price shock risk scores:

**Inputs**:
- Risk score
- Contributing signals with weights and deviations
- Baseline values and observed values
- Historical context

**Outputs**:
- Explainability report with:
  - Summary statement explaining why a price shock is likely (one sentence)
  - Contributing factors (ranked list)
  - Signal details (baseline vs observed)
  - Structural vs temporary assessment (critical for determining intervention type)
  - Recommended proportionate stabilizing actions

**Report Generation**:
- Rank signals by contribution percentage
- Generate natural language descriptions for each signal
- Explain whether deviation indicates structural market instability or temporary volatility
- Provide context (e.g., "rainfall 40% below normal for this time of year")
- Assess whether risk threatens small sellers with forced losses or consumers with artificial scarcity
- Suggest proportionate stabilization interventions based on risk level and causes
- Use templates for consistency and clarity

**Example Output**:
```
Risk Score: 68 (High) - Price Shock Risk

Summary: Onion prices in Maharashtra show high risk of harmful price shock due to transport disruptions and below-normal rainfall creating structural supply stress.

Contributing Factors:
1. Transport Disruptions (35%): Highway strike affecting major routes from Nashik
2. Rainfall Deficit (28%): 40% below seasonal normal for past 14 days
3. Price Deviation (22%): Mandi prices 25% above baseline
4. Hoarding Pattern (15%): Historical pattern suggests increased hoarding during transport disruptions

Assessment: Structural risk, not temporary volatility. Multiple correlated signals indicate sustained supply stress likely to cause harmful price shock affecting small sellers and consumers.

Harm Potential:
- Small sellers: Risk of forced losses if supply chain remains disrupted
- Consumers: Risk of artificial scarcity and price gouging in retail markets

Recommended Stabilizing Actions:
- Activate alternative transport routes to restore supply flow
- Release buffer stocks in affected regions to prevent artificial scarcity
- Monitor retail markets for panic buying and price gouging
- Coordinate with wholesalers to prevent hoarding
```

### Alert Generation Service

Creates and delivers alerts based on risk scores:

**Inputs**:
- Risk scores and levels
- Stakeholder preferences (commodities, regions, thresholds)
- Recent alert history

**Outputs**:
- Alerts with:
  - Alert ID
  - Timestamp
  - Commodity and region
  - Risk score and level
  - Explainability report
  - Recommended actions
  - Lead time estimate

**Processing**:
- Check risk score against stakeholder thresholds
- Verify alert not duplicate of recent alert (24-hour window)
- Escalate priority for critical level
- Estimate lead time based on historical patterns
- Format alert with explainability report
- Route to stakeholder delivery channels (email, SMS, dashboard)

**Alert Prioritization**:
- Critical level: immediate delivery, multiple channels
- High level: priority delivery, primary channel
- Moderate level: standard delivery, dashboard notification

### Dashboard Service

Provides web interface for monitoring and analysis:

**Features**:
- Risk score heatmap: commodity-region matrix with color-coded risk levels
- Time-series charts: risk score trends over time
- Signal visualizations: individual signal trends
- Geographic map: regional risk distribution
- Explainability panel: detailed reports for selected commodity-region
- Alert history: log of recent alerts
- Intervention tracker: recorded interventions and outcomes
- Filter controls: commodity, region, date range

**API Endpoints**:
- GET /risk-scores: retrieve current risk scores with filters
- GET /risk-scores/history: retrieve historical risk scores
- GET /signals: retrieve signal data with filters
- GET /explainability/{commodity}/{region}: retrieve explainability report
- GET /alerts: retrieve alerts with filters
- POST /interventions: record new intervention
- GET /interventions: retrieve intervention history

**Real-time Updates**:
- WebSocket connection for live risk score updates
- Automatic refresh when significant changes occur
- Notification badges for new alerts

### Intervention Tracking Service

Records and analyzes intervention effectiveness in preventing harm and stabilizing prices:

**Inputs**:
- Intervention records: type, commodity, region, timestamp, details
- Associated alerts
- Risk score trajectories

**Outputs**:
- Intervention effectiveness metrics:
  - Lead time: time between alert and intervention
  - Risk reduction: change in risk score post-intervention
  - Price stabilization: change in price volatility and return to baseline
  - Harm prevented: estimated impact on small sellers (avoided losses) and consumers (avoided artificial scarcity)
- Effectiveness reports: aggregated statistics by intervention type, commodity, region

**Processing**:
- Link interventions to triggering alerts
- Track risk scores for 14 days post-intervention
- Compute risk reduction as difference between projected and actual trajectory
- Measure price stabilization by comparing post-intervention price volatility to pre-intervention baseline
- Estimate harm prevented using counterfactual analysis:
  - Small seller protection: estimated losses avoided based on price trajectory
  - Consumer protection: estimated scarcity avoided based on supply restoration
  - Market stability: reduction in panic buying and hoarding behavior
- Aggregate metrics across interventions for pattern analysis
- Generate effectiveness reports for stakeholders focusing on harm prevention outcomes
- Identify most effective intervention types for different risk scenarios

## Data Models

### Signal Schema

```
Signal {
  signal_id: UUID
  signal_type: enum(market, logistics, climate, behavioral, event)
  timestamp: datetime
  region: string (standardized code)
  commodity: string (standardized code)
  value: variant (number or string)
  confidence: float (0.0 to 1.0)
  metadata: map<string, variant>
  created_at: datetime
}
```

### Baseline Model Schema

```
BaselineModel {
  model_id: UUID
  commodity: string
  region: string
  model_type: enum(price, volume)
  seasonal_coefficients: array<float>
  trend_coefficients: array<float>
  residual_variance: float
  expected_ranges: map<day_of_year, {min: float, max: float, mean: float}>
  last_updated: datetime
  version: int
}
```

### Deviation Score Schema

```
DeviationScore {
  score_id: UUID
  signal_id: UUID (foreign key)
  deviation_value: float (-100 to 100)
  deviation_magnitude: float
  baseline_value: float
  observed_value: float
  structural_flag: boolean
  smoothed_value: float
  computed_at: datetime
}
```

### Risk Score Schema

```
RiskScore {
  score_id: UUID
  commodity: string
  region: string
  timestamp: datetime
  supply_stress_score: float (0 to 100)
  price_shock_risk_score: float (0 to 100)
  combined_score: float (0 to 100)
  risk_level: enum(low, moderate, high, critical)
  trend: enum(rising, stable, falling)
  significant_change: boolean
  contributing_signals: array<{signal_id: UUID, contribution_pct: float}>
  created_at: datetime
}
```

### Explainability Report Schema

```
ExplainabilityReport {
  report_id: UUID
  risk_score_id: UUID (foreign key)
  summary: string
  contributing_factors: array<{
    signal_type: string,
    description: string,
    contribution_pct: float,
    baseline_value: variant,
    observed_value: variant
  }>
  structural_assessment: string
  recommended_actions: array<string>
  generated_at: datetime
}
```

### Alert Schema

```
Alert {
  alert_id: UUID
  risk_score_id: UUID (foreign key)
  commodity: string
  region: string
  risk_score: float
  risk_level: enum(low, moderate, high, critical)
  priority: enum(standard, high, critical)
  explainability_report_id: UUID (foreign key)
  lead_time_estimate: int (days)
  delivered_to: array<user_id>
  created_at: datetime
  delivered_at: datetime
}
```

### Intervention Schema

```
Intervention {
  intervention_id: UUID
  alert_id: UUID (foreign key, nullable)
  intervention_type: string
  commodity: string
  region: string
  description: string
  recorded_by: user_id
  recorded_at: datetime
  effectiveness_metrics: {
    lead_time_days: int,
    risk_reduction: float,
    price_stabilization: float,
    harm_prevented_estimate: string
  }
}
```

### User Schema

```
User {
  user_id: UUID
  username: string
  role: enum(viewer, analyst, operator, administrator)
  organization: string
  preferences: {
    commodities: array<string>,
    regions: array<string>,
    alert_thresholds: {
      moderate: float,
      high: float,
      critical: float
    },
    delivery_channels: array<enum(email, sms, dashboard)>
  }
  created_at: datetime
  last_login: datetime
}
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

The following properties are derived from the acceptance criteria in the requirements document. Each property is universally quantified and designed for property-based testing to validate system correctness across a wide range of inputs.

### Data Ingestion Properties

**Property 1: Signal ingestion completeness**
*For any* valid signal from any supported source type (mandi, wholesale, e-commerce, transport, mobility, railway, climate, behavioral), when ingested, the system should store the signal with all required metadata fields (timestamp, region, commodity, value) correctly associated.
**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11**

**Property 2: Ingestion resilience**
*For any* batch of signals containing both valid and invalid signals, the system should ingest all valid signals, log errors for invalid signals, and continue processing without failure.
**Validates: Requirements 1.12**

### Signal Normalization Properties

**Property 3: Normalization schema compliance**
*For any* ingested signal, after normalization, the signal should have all required fields (signal_id, signal_type, timestamp, region, commodity, value, confidence, metadata) in the standardized schema.
**Validates: Requirements 2.1**

**Property 4: Missing field handling**
*For any* signal with missing optional fields, after normalization, the signal should have default values applied or fields marked as unavailable, and should remain valid.
**Validates: Requirements 2.2**

**Property 5: Invalid data rejection**
*For any* signal with invalid data types in required fields, the normalization process should reject the signal and log a validation error.
**Validates: Requirements 2.3**

**Property 6: Signal deduplication**
*For any* set of signals representing the same underlying event (same timestamp and similar content), after deduplication, only one signal should be retained.
**Validates: Requirements 2.4**

**Property 7: Confidence weight bounds**
*For any* normalized signal, the assigned confidence weight should be between 0.0 and 1.0, and should reflect source reliability and data completeness.
**Validates: Requirements 2.5**

### Baseline Modeling Properties

**Property 8: Baseline model creation**
*For any* commodity-region pair with sufficient historical data (minimum 2 years), a baseline seasonal model should be created with expected value ranges for each time period.
**Validates: Requirements 3.1, 3.3**

**Property 9: Baseline model incremental update**
*For any* baseline model, when new historical data is added, the model should be updated without requiring full recomputation from scratch.
**Validates: Requirements 3.2**

**Property 10: Baseline seasonal variation**
*For any* baseline model, the expected value ranges should show variation across time periods reflecting seasonal patterns.
**Validates: Requirements 3.4**

**Property 11: Outlier exclusion from baselines**
*For any* historical dataset containing outliers, when computing a baseline model, the outliers should not significantly skew the expected value ranges compared to a dataset without outliers.
**Validates: Requirements 3.5**

### Deviation Detection Properties

**Property 12: Deviation score computation**
*For any* normalized signal with a corresponding baseline model, a deviation score should be computed comparing the observed value to the baseline expected range.
**Validates: Requirements 4.1**

**Property 13: Structural risk flagging**
*For any* deviation score exceeding the structural risk threshold, the signal should be flagged as potentially indicating structural risk.
**Validates: Requirements 4.3**

**Property 14: Smoothing reduces volatility**
*For any* sequence of deviation scores, the smoothed values should have lower variance than the raw values, demonstrating noise reduction.
**Validates: Requirements 4.4**

**Property 15: Sustained deviation amplification**
*For any* sequence of consecutive signals showing deviations in the same direction, the deviation score should increase to indicate structural risk.
**Validates: Requirements 4.5**

**Property 16: Deviation record completeness**
*For any* computed deviation score, the system should record the baseline value, observed value, and deviation magnitude.
**Validates: Requirements 4.6**

### Signal Fusion Properties

**Property 17: Risk score generation from deviations**
*For any* set of deviation scores from multiple signal types for a commodity-region pair, the fusion engine should produce a unified price shock risk score between 0 and 100.
**Validates: Requirements 5.1, 7.1**

**Property 18: Confidence weighting influence**
*For any* two sets of deviation scores that differ only in confidence weights, the set with higher confidence weights should have greater influence on the final risk score.
**Validates: Requirements 5.2**

**Property 19: Noise dampening in fusion**
*For any* sequence of risk score updates, the risk scores should be less volatile than the individual deviation scores, demonstrating noise dampening.
**Validates: Requirements 5.4**

**Property 20: Correlation amplification**
*For any* set of deviation scores showing correlation across multiple signal types (e.g., market and logistics both deviating), the combined risk score should be higher than the sum of independent contributions.
**Validates: Requirements 5.5**

**Property 21: Dual risk score output**
*For any* fusion computation, the system should produce both a supply stress risk score and a price shock risk score.
**Validates: Requirements 5.6**

**Property 22: Risk score incremental update**
*For any* existing risk score, when a new signal arrives, the risk score should be updated to reflect the new information.
**Validates: Requirements 5.7**

### News Classification Properties

**Property 23: News category assignment**
*For any* news text, the classification engine should assign a category from the defined set (strike, policy_announcement, export_ban, protest, flood, drought, other).
**Validates: Requirements 6.1**

**Property 24: Entity extraction from news**
*For any* classified news item, the system should extract affected regions, commodities, and time periods where present in the text.
**Validates: Requirements 6.2**

**Property 25: Transport disruption signal derivation**
*For any* news item classified as indicating transport disruption, the system should increase the logistics risk signal for the affected region.
**Validates: Requirements 6.3**

**Property 26: Policy change flagging**
*For any* news item classified as a policy announcement, the system should flag the affected commodity for increased monitoring.
**Validates: Requirements 6.4**

**Property 27: Weather news validation**
*For any* news item classified as extreme weather, the system should correlate it with climate signals for validation.
**Validates: Requirements 6.5**

**Property 28: Low-confidence signal weighting**
*For any* news classification with confidence below a threshold, the derived signal should have a reduced confidence weight proportional to the classification confidence.
**Validates: Requirements 6.6**

### Risk Scoring Properties

**Property 29: Risk level classification**
*For any* risk score, the system should classify it into the correct level: low (0-25), moderate (26-50), high (51-75), or critical (76-100).
**Validates: Requirements 7.3**

**Property 30: Significant change detection**
*For any* risk score update where the score changes by more than 10 points, the system should flag the change as significant.
**Validates: Requirements 7.5**

**Property 31: Risk score persistence**
*For any* computed risk score, the system should store it in the historical record with timestamp and all associated metadata.
**Validates: Requirements 7.6**

### Explainability Properties

**Property 32: Explainability report generation**
*For any* computed risk score, the system should generate an explainability report explaining why a price shock is likely and listing the contributing signals and their causal relationships.
**Validates: Requirements 8.1**

**Property 33: Report field completeness**
*For any* explainability report, each contributing signal should have signal type, deviation magnitude, confidence weight, and contribution percentage recorded.
**Validates: Requirements 8.2**

**Property 34: Signal contribution ranking**
*For any* explainability report, the contributing signals should be ranked in descending order by contribution percentage.
**Validates: Requirements 8.3**

**Property 35: Report accessibility**
*For any* displayed risk score, the corresponding explainability report should be accessible through the system interface.
**Validates: Requirements 8.5**

**Property 36: Structural assessment inclusion**
*For any* explainability report, the report should include an assessment of whether price shock risk is driven by structural factors or temporary conditions.
**Validates: Requirements 8.6**

### Alerting Properties

**Property 37: High threshold alert generation**
*For any* risk score exceeding the high threshold (51), the system should generate an alert for the affected commodity and region.
**Validates: Requirements 9.1**

**Property 38: Critical priority escalation**
*For any* risk score exceeding the critical threshold (76), the generated alert should have escalated priority indicating imminent harm.
**Validates: Requirements 9.2**

**Property 39: Alert routing by preferences**
*For any* generated alert, the alert should be delivered only to stakeholders whose preferences match the alert's commodity and region.
**Validates: Requirements 9.3**

**Property 40: Alert content completeness**
*For any* generated alert, the alert should include risk score, risk level, contributing signals, and recommended preventive actions.
**Validates: Requirements 9.4**

**Property 41: Alert deduplication**
*For any* condition triggering multiple alerts within 24 hours, only the first alert should be generated, preventing duplicates.
**Validates: Requirements 9.5**

**Property 42: Preference configurability**
*For any* stakeholder, the system should allow configuration of alert thresholds and delivery preferences, and should apply those preferences to alert generation.
**Validates: Requirements 9.6**

**Property 43: Lead time inclusion**
*For any* generated alert, the alert should include a lead time estimate indicating time before expected crisis manifestation.
**Validates: Requirements 9.7**

### Intervention Tracking Properties

**Property 44: Intervention recording**
*For any* intervention taken by a stakeholder, the system should record the intervention type, target commodity, target region, and timestamp.
**Validates: Requirements 11.1**

**Property 45: Intervention-alert linking**
*For any* recorded intervention triggered by an alert, the intervention should be associated with the triggering alert.
**Validates: Requirements 11.2**

**Property 46: Post-intervention tracking**
*For any* recorded intervention, the system should track risk scores for the affected commodity-region pair for at least 14 days post-intervention.
**Validates: Requirements 11.3**

**Property 47: Effectiveness metrics computation**
*For any* recorded intervention, the system should compute effectiveness metrics including lead time, risk score reduction, price stabilization impact, and harm prevented estimate (small seller losses avoided, consumer scarcity avoided).
**Validates: Requirements 11.4**

**Property 48: Effectiveness aggregation**
*For any* set of interventions, the system should provide aggregated effectiveness reports by intervention type, commodity, and region.
**Validates: Requirements 11.5**

### Resilience Properties

**Property 49: Partial signal resilience**
*For any* commodity-region pair, when some signal sources are unavailable, the system should continue computing risk scores using available signals.
**Validates: Requirements 13.1**

**Property 50: Delayed signal processing**
*For any* delayed signal that arrives late, the system should process it and update risk scores retroactively if necessary.
**Validates: Requirements 13.2**

**Property 51: Data quality flagging**
*For any* signal source with consistently poor data quality (multiple validation failures or low confidence), the system should flag the source for operator attention.
**Validates: Requirements 13.4**

**Property 52: Quality issue notification**
*For any* detected data quality issue, the system should notify system operators.
**Validates: Requirements 13.5**

### Auditability Properties

**Property 53: Ingestion audit logging**
*For any* signal ingestion event, the system should log the event with timestamp, source, and data summary.
**Validates: Requirements 14.1**

**Property 54: Risk score computation logging**
*For any* risk score computation, the system should log the computation with timestamp, inputs, and outputs.
**Validates: Requirements 14.2**

**Property 55: Alert generation logging**
*For any* generated alert, the system should log the alert generation event with timestamp, recipient, and content.
**Validates: Requirements 14.3**

**Property 56: Intervention recording logging**
*For any* recorded intervention, the system should log the intervention with timestamp, stakeholder, and details.
**Validates: Requirements 14.4**

**Property 57: Audit report generation**
*For any* commodity-region pair, the system should provide an audit report showing the complete history of risk score changes.
**Validates: Requirements 14.6**

### Access Control Properties

**Property 58: Authentication enforcement**
*For any* request to the system, if the request is not authenticated, the system should reject the request.
**Validates: Requirements 15.1**

**Property 59: Role-based permission assignment**
*For any* user, the system should assign a role (viewer, analyst, operator, administrator) with associated permissions.
**Validates: Requirements 15.2**

**Property 60: Authorization verification**
*For any* data access request, the system should grant access only if the user has permission for the requested commodity and region.
**Validates: Requirements 15.3**

**Property 61: Access attempt logging**
*For any* authentication attempt (successful or failed), the system should log the attempt with timestamp and user identifier.
**Validates: Requirements 15.4**

**Property 62: Access revocation**
*For any* user whose access is revoked by an administrator, the user should immediately be unable to access the system.
**Validates: Requirements 15.5**

### Performance Monitoring Properties

**Property 63: Ingestion rate tracking**
*For any* signal source, the system should track and report the ingestion rate (signals per unit time).
**Validates: Requirements 16.1**

**Property 64: Computation latency tracking**
*For any* risk score computation, the system should track and report the computation latency.
**Validates: Requirements 16.2**

**Property 65: Dashboard response time tracking**
*For any* dashboard request, the system should track and report the response time.
**Validates: Requirements 16.3**

**Property 66: Alert delivery tracking**
*For any* alert delivery attempt, the system should track and report whether delivery succeeded or failed.
**Validates: Requirements 16.4**

**Property 67: Performance threshold alerting**
*For any* performance metric that exceeds its acceptable threshold, the system should alert system operators.
**Validates: Requirements 16.5**

## Error Handling

The system must handle errors gracefully to maintain resilience and prevent cascading failures:

### Data Ingestion Errors

- Invalid signal format: Reject signal, log validation error with details, continue processing other signals
- Missing required fields: Reject signal, log error, continue processing
- Duplicate signals: Deduplicate based on content similarity, log deduplication event
- Source unavailable: Log unavailability, continue with other sources, retry with exponential backoff
- Rate limit exceeded: Queue signals for later processing, log rate limit event

### Processing Errors

- Baseline model missing: Log warning, skip deviation computation for that signal, continue processing
- Deviation computation failure: Log error with signal details, continue processing other signals
- Fusion engine failure: Log error, use previous risk score, alert operators
- Invalid confidence weight: Clamp to valid range [0.0, 1.0], log warning
- Numerical overflow/underflow: Clamp to valid ranges, log warning

### Classification Errors

- News classification failure: Assign "other" category with low confidence, log error
- Entity extraction failure: Proceed without entities, log warning
- Low classification confidence: Reduce signal confidence weight, proceed with classification

### Storage Errors

- Database write failure: Retry with exponential backoff, queue for later persistence, alert operators
- Database read failure: Return cached data if available, log error, alert operators
- Storage capacity exceeded: Archive old data, alert operators, continue with available space

### Alert Delivery Errors

- Delivery channel unavailable: Retry with alternative channel, log failure
- Recipient unreachable: Log failure, retry later, alert administrators
- Alert formatting error: Use fallback template, log error

### Authentication and Authorization Errors

- Invalid credentials: Reject request, log failed attempt, increment failure counter
- Expired session: Reject request, prompt re-authentication
- Insufficient permissions: Reject request, log unauthorized attempt
- Role assignment error: Use default viewer role, log error, alert administrators

### Recovery Strategies

- Graceful degradation: Continue operating with reduced functionality when components fail
- Circuit breaker: Temporarily disable failing components to prevent cascading failures
- Retry with backoff: Retry failed operations with exponential backoff
- Fallback to cache: Use cached data when live data unavailable
- Operator notification: Alert operators for critical failures requiring intervention

## Testing Strategy

The system requires comprehensive testing using both unit tests and property-based tests to ensure correctness, resilience, and performance.

### Dual Testing Approach

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Specific signal ingestion scenarios (valid, invalid, missing fields)
- Baseline model computation with known datasets
- Deviation detection with specific baseline and signal values
- Risk score computation with specific deviation score combinations
- Alert generation with specific risk score thresholds
- Integration between components (e.g., ingestion → normalization → storage)
- Error handling scenarios (database failures, invalid inputs)
- Edge cases (empty datasets, extreme values, boundary conditions)

**Property-Based Tests**: Verify universal properties across all inputs
- All 67 correctness properties defined above
- Each property test runs minimum 100 iterations with randomized inputs
- Properties validate invariants that must hold for all valid inputs
- Properties catch edge cases that unit tests might miss

### Property-Based Testing Configuration

**Testing Library**: Use Hypothesis (Python), fast-check (JavaScript/TypeScript), or QuickCheck (Haskell) depending on implementation language

**Test Configuration**:
- Minimum 100 iterations per property test
- Randomized generation of signals, baselines, deviation scores, risk scores
- Shrinking enabled to find minimal failing examples
- Seed recording for reproducibility

**Test Tagging**: Each property test must reference its design document property
- Tag format: `Feature: agricultural-supply-intelligence, Property {number}: {property_text}`
- Example: `Feature: agricultural-supply-intelligence, Property 1: Signal ingestion completeness`

**Generator Design**:
- Signal generators: produce valid signals with randomized values, regions, commodities
- Baseline model generators: produce valid models with seasonal patterns
- Deviation score generators: produce scores in valid ranges with randomized contributions
- Risk score generators: produce scores with randomized signal combinations
- News text generators: produce text samples for classification testing
- User generators: produce users with randomized roles and preferences

### Testing Priorities

**Critical Path Testing** (highest priority):
1. Signal ingestion and normalization (Properties 1-7)
2. Baseline modeling and deviation detection (Properties 8-16)
3. Signal fusion and risk scoring (Properties 17-22, 29-31)
4. Explainability generation (Properties 32-36)
5. Alert generation and delivery (Properties 37-43)

**Secondary Testing**:
6. News classification (Properties 23-28)
7. Intervention tracking (Properties 44-48)
8. Resilience and error handling (Properties 49-52)

**Infrastructure Testing**:
9. Auditability (Properties 53-57)
10. Access control (Properties 58-62)
11. Performance monitoring (Properties 63-67)

### Integration Testing

Beyond unit and property tests, integration tests verify end-to-end workflows:
- Complete signal flow: ingestion → normalization → deviation → fusion → risk score → alert
- Dashboard data retrieval and visualization
- Intervention recording and effectiveness tracking
- Audit log generation and retrieval
- User authentication and authorization flows

### Performance Testing

Validate system performance under load:
- Signal ingestion throughput (signals per second)
- Risk score computation latency (milliseconds)
- Dashboard response time (milliseconds)
- Alert delivery latency (seconds)
- Concurrent user capacity (number of users)
- Data volume scalability (terabytes of historical data)

### Scenario Testing

Test realistic scenarios based on historical events:
- Transport strike scenario: simulate highway strike, verify risk score increases, alert generated
- Rainfall deficit scenario: simulate drought conditions, verify climate signals detected, risk amplified
- Festival demand scenario: simulate festival period, verify behavioral signals applied, baseline adjusted
- Combined crisis scenario: simulate multiple correlated signals, verify correlation amplification
- Intervention effectiveness scenario: simulate intervention, verify risk score reduction tracked

### Continuous Testing

- Automated test execution on every code commit
- Property tests run in CI/CD pipeline
- Performance regression testing on staging environment
- Canary deployments with real-time monitoring
- Rollback triggers based on error rates and performance metrics
