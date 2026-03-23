import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import FarmersList from './pages/farmers/FarmersList.tsx';
import FarmerProfile from './pages/farmers/FarmerProfile.tsx';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/farmers" element={<FarmersList />} />
                <Route path="/farmers/:id" element={<FarmerProfile />} />
                {/* We'll add more routes as we build */}
            </Route>
        </Routes>
    );
}

export default App;