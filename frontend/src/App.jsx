import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import OverviewPage from './pages/OverviewPage/OverviewPage';
import DetailPage from './pages/DetailPage/DetailPage';
import MapPage from './pages/MapPage/MapPage';
import SignalsPage from './pages/SignalsPage/SignalsPage';
import AlertsPage from './pages/AlertsPage/AlertsPage';
import InterventionsPage from './pages/InterventionsPage/InterventionsPage';
import AuditPage from './pages/AuditPage/AuditPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/risk/:commodity/:region" element={<DetailPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/signals" element={<SignalsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/interventions" element={<InterventionsPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
