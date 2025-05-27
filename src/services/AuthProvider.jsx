
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

const [role, setRole] = useState(() => {
return localStorage.getItem('role') || '';
});

const [isAuthenticated, setIsAuthenticated] = useState(() => {
  const savedData = localStorage.getItem('authenticationData');
  return savedData === 'true' ? true : false;
});

//uppdatera localstorage varje gång roll uppdateras
useEffect(() => {
    localStorage.setItem('role', role);
}, [role]);

//uppdatera localstorage varje gång användare är verifierad
useEffect(() => {
  localStorage.setItem("authenticationData", isAuthenticated.toString());
}, [isAuthenticated]);

return (
<AuthContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated }}>
    {children}
</AuthContext.Provider>
)

};

export { AuthProvider, AuthContext};