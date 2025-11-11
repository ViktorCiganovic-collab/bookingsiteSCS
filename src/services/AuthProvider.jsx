
import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

const [role, setRole] = useState(() => {
return localStorage.getItem('role') || '';
});

const [isAuthenticated, setIsAuthenticated] = useState(() => {
  const savedData = localStorage.getItem('authenticationData');
  return savedData === 'true' ? true : false;
});

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [email, setEmail] = useState('');

//uppdatera localstorage varje gång roll uppdateras
useEffect(() => {
    localStorage.setItem('role', role);
}, [role]);

//uppdatera localstorage varje gång användare är verifierad
useEffect(() => {
  localStorage.setItem("authenticationData", isAuthenticated.toString());
}, [isAuthenticated]);

  // Decode email from token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email || '');
        console.log(email);
      } catch (error) {
        console.error('Failed to decode token:', error);
        setEmail('');
      }
    } else {
      setEmail('');
    }
  }, [token]);

return (
<AuthContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated, token, setToken, email }}>
    {children}
</AuthContext.Provider>
)

};

export { AuthProvider, AuthContext};