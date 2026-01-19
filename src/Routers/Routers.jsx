import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../Components/Loader.jsx';
import { AuthContext } from '../AuthContext/AuthProvider.jsx';
import PublicRoute from '../Components/CustomeRoute/PublicRoute.jsx';
import ProtectedRoute from '../Components/CustomeRoute/ProtectedRoute.jsx';

// Lazy load the components
const Dashboard = lazy(() => import('../Pages/Dashboard.jsx'));
const Login = lazy(() => import('../Pages/Login/Login.jsx'));
const Services = lazy(() => import('../Pages/Services'));
const ServiceDetails = lazy(() => import('../Pages/ServiceDetails'));
const Customers = lazy(() => import('../Pages/Customers'));
const CustomerDetails = lazy(() => import('../Pages/CustomerDetails'));
const Videos = lazy(() => import('../Pages/Videos'));
const Notifications = lazy(() => import('../Pages/Notifications'));
const NotFound = lazy(() => import('../Components/NotFound/index.jsx'));

export default function Routers() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            <Suspense fallback={<Loader isLoading={true} />}>
                <Routes>
                    {/* 
                        Root Path Logic:
                        Redirects to Dashboard if logged in, otherwise to Login.
                    */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated
                                ? <Navigate to="/dashboard" replace />
                                : <Navigate to="/login" replace />
                        }
                    />

                    {/* Public Routes (Accessible only when logged out) */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute isAuthenticated={isAuthenticated}>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    {/* Protected Routes (Accessible only when logged in) */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    >
                        {/* Default dashboard tab */}
                        <Route index element={<Navigate to="/dashboard/services" replace />} />

                        {/* Feature Routes */}
                        <Route path="services" element={<Services />} />
                        <Route path="service/details" element={<ServiceDetails />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="customer/details" element={<CustomerDetails />} />
                        <Route path="videos" element={<Videos />} />
                        <Route path="notifications" element={<Notifications />} />

                        {/* Inner Dashboard 404 or Redirect */}
                        <Route path="*" element={<NotFound />} />
                    </Route>

                    {/* Global catch-all: shows 404 page for unknown top-level paths */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}