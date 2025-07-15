import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({roles}) {
 console.log('the roles are:', roles);
  const { user, loading } = useAuth();
 console.log('the role of the user is:', user);
 
  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user || user.role !== roles) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
