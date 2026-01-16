import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, isAuthenticated }) => {
    if (isAuthenticated) {
        return <Navigate to="/dashboard/home" replace />;
    }

    return children;
};

export default PublicRoute;
