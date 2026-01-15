import { DashboardProvider } from './context/DashboardContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  return (
    <DashboardProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </DashboardProvider>
  );
}

export default App;
