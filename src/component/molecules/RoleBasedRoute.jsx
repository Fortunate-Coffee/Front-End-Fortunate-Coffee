import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className='flex justify-center w-full'>
        <Navigate to="/login?showAlert=true" />
      </div>
    );
  }

  if (allowedRoles.includes(userRole)) {
    return children;
  }

  return <Navigate to="/not-authorized" />;
};

export default RoleBasedRoute;
