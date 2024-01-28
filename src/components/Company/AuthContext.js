import React, {createContext, useContext, useEffect, useState} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);
    const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));


        // Burada ekstra oturum açma işlemleri yapabilirsiniz
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        window.location.href = `/`;
        // Burada ekstra oturum kapatma işlemleri yapabilirsiniz
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
