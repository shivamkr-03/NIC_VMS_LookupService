import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { VehicleLookupPage } from './pages/VehicleLookupPage';
import { FuelStationLookupPage } from './pages/FuelStationLookupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="vehicles" element={<VehicleLookupPage />} />
          <Route path="fuelstations" element={<FuelStationLookupPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
