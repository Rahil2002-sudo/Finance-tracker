import { Routes, Route } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  return (
    <DashboardProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<div className="text-center mt-20">My Wallet Page (Coming Soon)</div>} />
          <Route path="/transfers" element={<div className="text-center mt-20">Transfers Page (Coming Soon)</div>} />
          <Route path="/bills" element={<div className="text-center mt-20">Bills Page (Coming Soon)</div>} />
          <Route path="/settings" element={<div className="text-center mt-20">Settings Page (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </DashboardProvider>
  );
}

export default App;
