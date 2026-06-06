import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Utilisateurs par défaut pour la démo
  const DEFAULT_USERS = [
    { email: 'admin@entrenous.ga', password: '1234', role: 'admin', name: 'Super Admin' },
    { email: 'manager@entrenous.ga', password: '123', role: 'manager', name: 'Manager' },
    { email: 'editeur@entrenous.ga', password: '123', role: 'editor', name: 'Staff Entrée' }
  ];

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    const role = localStorage.getItem('adminRole');
    const user = localStorage.getItem('adminUser');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setUserRole(role);
      setCurrentUser(user ? JSON.parse(user) : null);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Lecture dynamique des utilisateurs de l'admin (synchronisation)
    const saved = localStorage.getItem('entrenous_admin_users');
    const adminUsers = saved ? JSON.parse(saved) : [];

    const uniqueUsers = [];
    const seenEmails = new Set();

    // Priorité aux utilisateurs de l'admin (qui peuvent être modifiés dans l'interface)
    adminUsers.forEach(u => {
      // Normalisation des rôles en cas de résidus d'anciens formats textuels en base
      let mappedRole = u.role;
      if (mappedRole === 'Super Admin') mappedRole = 'admin';
      if (mappedRole === 'Manager') mappedRole = 'manager';
      if (mappedRole === 'Éditeur') mappedRole = 'editor';

      uniqueUsers.push({
        email: u.email,
        password: u.accessCode,
        role: mappedRole,
        name: u.name
      });
      seenEmails.add(u.email);
    });

    // Ajouter les utilisateurs par défaut s'ils ne sont pas écrasés dans le localStorage
    DEFAULT_USERS.forEach(u => {
      if (!seenEmails.has(u.email)) {
        uniqueUsers.push(u);
      }
    });

    const user = uniqueUsers.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminRole', user.role);
      localStorage.setItem('adminUser', JSON.stringify({ name: user.name, email: user.email }));
      setIsAuthenticated(true);
      setUserRole(user.role);
      setCurrentUser({ name: user.name, email: user.email });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, currentUser, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
