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
import ForgotPasswordPage from './ForgotPasswordPage.jsx';
import ResetPasswordPage from './ResetPasswordPage.jsx';
import About from './About.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import UserDashboard from './UserDashboard.jsx';
import Booking from './Booking.jsx';
import InfoPage from './InfoPage.jsx';
import IntegrityPolicy from './IntegrityPolicy.jsx';
import Accessibility from './Accessibility.jsx';
import BookingTermsPage from './BookingTerms.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51NXMZwLnaujgTgslmIML1du0820qvljj86C62VIQQcEhTE1c5vhVA7E7xzaauwCBt4O1101PnVYRYE07MAIJjnjj00Fzk4o2q2'); 


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
        path: 'cert/:certname/:description/:certtestprice/:certcategory/:certid',
        element: <CertDetail />,
      },
      {
        path: 'info',
        element: <InfoPage />
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
        path: 'forgot_password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'reset-password',
        element: <ResetPasswordPage />,
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
        path: 'booking',
        element: <ProtectedRoute />,   // skyddar allt under /booking
        children: [
          {
            path: ':categoryid/:certificatename/:examid/:price',
            element: <Booking />
          }
        ]
      },
      {
        path: 'integrity-policy',
        element: <IntegrityPolicy />
      },

      {
        path: 'accessibility',
        element: <Accessibility />
      },
      {
        path: 'booking-terms',
        element: <BookingTermsPage />
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
