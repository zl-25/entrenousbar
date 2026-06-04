import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0C0D10] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#00E35F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Contrôle d'accès basé sur les rôles
  const path = location.pathname;
  
  if (userRole === 'editor') {
    const allowedEditorPaths = ['/admin', '/admin/tickets', '/admin/reservations', '/admin/gallery'];
    const isAllowed = allowedEditorPaths.some(p => path === p || path.startsWith(p + '/'));
    if (!isAllowed) {
      return <Navigate to="/admin/tickets" replace />; // Redirige l'éditeur vers le scan par défaut
    }
  }

  if (userRole === 'manager') {
    const forbiddenManagerPaths = ['/admin/users', '/admin/settings', '/admin/newsletters'];
    const isForbidden = forbiddenManagerPaths.some(p => path === p || path.startsWith(p + '/'));
    if (isForbidden) {
      return <Navigate to="/admin" replace />; // Redirige le manager vers le dashboard
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
