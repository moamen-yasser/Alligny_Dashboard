import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const auth = Cookies.get('isAuthenticated');
        const token = Cookies.get('token');
        const admin = Cookies.get('admin');
        return auth === 'true' && !!token && !!admin;
    });

    const login = (response) => {
        if (response) {
            Cookies.set('isAuthenticated', 'true', { expires: 1 });
            Cookies.set('admin', JSON.stringify(response.profile), { expires: 1 });
            Cookies.set('token', response.token, { expires: 1 });
        }
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove('isAuthenticated');
        Cookies.remove('admin');
        Cookies.remove('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};