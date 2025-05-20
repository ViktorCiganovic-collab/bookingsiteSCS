import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ roleRequired }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/user" />;  // Redirect to a general user page if not admin
  }

  return <Outlet />; // Render the requested route if authorized
}

export default PrivateRoute;
