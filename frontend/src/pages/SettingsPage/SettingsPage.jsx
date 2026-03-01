import { useState } from 'react';
import { COMMODITIES, REGIONS } from '../../utils/constants';
import './SettingsPage.css';

export default function SettingsPage() {
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [smsAlerts, setSmsAlerts] = useState(false);
    const [dashboardAlerts, setDashboardAlerts] = useState(true);

    return (
        <div className="settings-page">
            <div className="page-header">
                <h1>Settings</h1>
                <p>Configure your alert preferences, monitored commodities, and notification channels</p>
            </div>

            {/* Profile */}
            <div className="settings-section">
                <h2>Profile</h2>
                <div className="settings-row">
                    <label>Username</label>
                    <span>Karan Sumbly</span>
                </div>
                <div className="settings-row">
                    <label>Role</label>
                    <span style={{ color: 'var(--color-accent-hover)' }}>Analyst</span>
                </div>
                <div className="settings-row">
                    <label>Organization</label>
                    <span>Food & Civil Supplies Dept</span>
                </div>
            </div>

            {/* Alert Preferences */}
            <div className="settings-section">
                <h2>Alert Preferences</h2>
                <div className="settings-row">
                    <label>Critical Threshold</label>
                    <input type="number" defaultValue={76} min={0} max={100} />
                </div>
                <div className="settings-row">
                    <label>High Threshold</label>
                    <input type="number" defaultValue={51} min={0} max={100} />
                </div>
                <div className="settings-row">
                    <label>Moderate Threshold</label>
                    <input type="number" defaultValue={26} min={0} max={100} />
                </div>
            </div>

            {/* Delivery Channels */}
            <div className="settings-section">
                <h2>Delivery Channels</h2>
                <div className="settings-row">
                    <label>Email Alerts</label>
                    <div className={`toggle-switch ${emailAlerts ? 'active' : ''}`} onClick={() => setEmailAlerts(!emailAlerts)} />
                </div>
                <div className="settings-row">
                    <label>SMS Alerts</label>
                    <div className={`toggle-switch ${smsAlerts ? 'active' : ''}`} onClick={() => setSmsAlerts(!smsAlerts)} />
                </div>
                <div className="settings-row">
                    <label>Dashboard Notifications</label>
                    <div className={`toggle-switch ${dashboardAlerts ? 'active' : ''}`} onClick={() => setDashboardAlerts(!dashboardAlerts)} />
                </div>
            </div>

            {/* Monitored Items */}
            <div className="settings-section">
                <h2>Monitored Commodities</h2>
                <div className="settings-chips">
                    {COMMODITIES.map(c => (
                        <span key={c} className="settings-chip">{c}</span>
                    ))}
                </div>
            </div>

            <div className="settings-section">
                <h2>Monitored Regions</h2>
                <div className="settings-chips">
                    {REGIONS.map(r => (
                        <span key={r.code} className="settings-chip">{r.name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
