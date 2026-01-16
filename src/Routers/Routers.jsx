import { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../Components/Loader.jsx';
import ProtectedRoute from '../Components/ProtectedRoute.jsx';
import PublicRoute from '../Components/PublicRoute.jsx';
import { AuthContext } from '../AuthContext/AuthProvider.jsx';

// Lazy load the components
const Dashboard = lazy(() => import('../Pages/Dashboard.jsx'));
const Login = lazy(() => import('../Pages/Login/Login.jsx'));
const Services = lazy(() => import('../Pages/Services'));
const ServiceDetails = lazy(() => import('../Pages/ServiceDetails'));
const Customers = lazy(() => import('../Pages/Customers'));
const Videos = lazy(() => import('../Pages/Videos'));

export default function Routers() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                {/* Redirect root URL to login page */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Login Route */}
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<Loader isLoading={true} />}>
                            <PublicRoute isAuthenticated={isAuthenticated}>
                                <Login />
                            </PublicRoute>
                        </Suspense>
                    }
                />

                {/* Dashboard Routes with Layout */}
                <Route
                    path="/dashboard"
                    element={
                        <Suspense fallback={<Loader isLoading={true} />}>
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                >
                    {/* Default redirect to services if no tab is specified */}
                    <Route index element={<Navigate to="/dashboard/services" replace />} />

                    <Route
                        path="services"
                        element={
                            <Suspense fallback={<Loader isLoading={true} />}>
                                <Services />
                            </Suspense>
                        }
                    />
                    <Route
                        path="service/details"
                        element={
                            <Suspense fallback={<Loader isLoading={true} />}>
                                <ServiceDetails />
                            </Suspense>
                        }
                    />
                    <Route
                        path="customers"
                        element={
                            <Suspense fallback={<Loader isLoading={true} />}>
                                <Customers />
                            </Suspense>
                        }
                    />
                    <Route
                        path="videos"
                        element={
                            <Suspense fallback={<Loader isLoading={true} />}>
                                <Videos />
                            </Suspense>
                        }
                    />
                    {/* Catch-all for dashboard tabs */}
                    <Route path=":tabValue" element={<Navigate to="/dashboard/services" replace />} />
                </Route>
            </Routes>
        </Router>
    );
}