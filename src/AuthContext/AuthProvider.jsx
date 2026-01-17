import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const auth = Cookies.get('isAuthenticated');
        const token = Cookies.get('token');
        const admin = Cookies.get('admin');
        return auth === 'true' && !!token && !!admin;
    });

    const timeoutRef = useRef(null);
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

    const logout = useCallback(() => {
        Cookies.remove('isAuthenticated');
        Cookies.remove('admin');
        Cookies.remove('token');
        setIsAuthenticated(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    const resetInactivityTimer = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (isAuthenticated) {
            timeoutRef.current = setTimeout(() => {
                console.log('Session revoked due to inactivity');
                logout();
            }, INACTIVITY_LIMIT);
        }
    }, [isAuthenticated, logout]);

    useEffect(() => {
        if (isAuthenticated) {
            const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

            events.forEach(event => document.addEventListener(event, resetInactivityTimer));
            resetInactivityTimer();

            return () => {
                events.forEach(event => document.removeEventListener(event, resetInactivityTimer));
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        }
    }, [isAuthenticated, resetInactivityTimer]);

    const login = (response) => {
        if (response) {
            const expiry = 1 / 3; // 8 hours hard limit
            Cookies.set('isAuthenticated', 'true', { expires: expiry });
            Cookies.set('admin', JSON.stringify(response.profile), { expires: expiry });
            Cookies.set('token', response.token, { expires: expiry });
        }
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};