import './i18n'; 
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './services/AuthProvider.jsx';
import ProtectedRoute from './services/ProtectedRoute.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import App from './App.jsx';
import Layout from './Layout.jsx';
import Cert from './Cert.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.css';
import CertDetail from './CertDetail.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import About from './About.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import UserDashboard from './UserDashboard.jsx';
import Booking from './Booking.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QezsBKfpgfUfOSHUfaVmdDwoStl2MTjNGBLi0awJSe1C6kDGYj9QLNy2t4ROEbZmqMhb4IAnw8JVyxv5W6JQHfk00VEPGhTGe'); 


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout context={{}} />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'cert',
        element: <Cert />,
      },
  
      {
        path: 'cert/:certname/:description/:certtestprice/:certcategory',
        element: <CertDetail />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'user',
        element: <ProtectedRoute requiredRole="User" />,
        children: [{ index: true, element: <UserDashboard /> }],
      },
      {
        path: 'admin',
        element: <ProtectedRoute requiredRole="Admin" />,
        children: [{ index: true, element: <AdminDashboard /> }],  
       
      },
      {
        path: 'booking/:categoryid/:certificatename/:examid/:price',
        element: <Booking />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
      </Elements>
    </AuthProvider>
  </StrictMode>
);
