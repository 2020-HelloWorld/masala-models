import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Map, BarChart3, Bell, Shield, FileText, Settings,
    ChevronLeft, ChevronRight, ShieldAlert, Search
} from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Overview' },
    { to: '/map', icon: Map, label: 'Map View' },
    { to: '/signals', icon: BarChart3, label: 'Signals' },
    { to: '/alerts', icon: Bell, label: 'Alerts', badge: 3 },
    { to: '/interventions', icon: Shield, label: 'Interventions' },
    { to: '/audit', icon: FileText, label: 'Audit Log' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <>
            <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <ShieldAlert />
                    </div>
                    <span className="sidebar-title">Price Shield</span>
                </div>

                <div className="sidebar-search-container">
                    <div className="sidebar-search">
                        <Search size={16} />
                        <input type="text" placeholder="Global Search" />
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-item-icon">
                                <item.icon size={20} />
                            </span>
                            <span className="nav-item-label">{item.label}</span>
                            {item.badge && <span className="nav-item-badge">{item.badge}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">KS</div>
                        <div className="sidebar-user-info">
                            <div className="sidebar-user-name">Karan S.</div>
                            <div className="sidebar-user-role">Analyst</div>
                        </div>
                    </div>
                    <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>
            </aside>

            {/* Mobile bottom nav */}
            <nav className="mobile-nav">
                {navItems.slice(0, 5).map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </>
    );
}
