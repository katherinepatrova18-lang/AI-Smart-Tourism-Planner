import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import Hotels from './pages/Hotels';
import AIPlanner from './pages/AIPlanner';
import Budget from './pages/Budget';
import MyTrips from './pages/MyTrips';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/explore',
    element: <Explore />
  },
  {
    path: '/destination/:id',
    element: <DestinationDetails />
  },
  {
    path: '/hotels',
    element: <Hotels />
  },
  {
    path: '/ai-planner',
    element: <AIPlanner />
  },
  {
    path: '/budget',
    element: <Budget />
  },
  {
    path: '/my-trips',
    element: (
      <ProtectedRoute>
        <MyTrips />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/favorites',
    element: (
      <ProtectedRoute>
        <Favorites />
      </ProtectedRoute>
    )
  },
  {
    path: '/saved-trips',
    element: (
      <ProtectedRoute>
        <MyTrips />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const App = () => {
  return (
    <AuthProvider>
      <UIProvider>
        <RouterProvider router={router} />
      </UIProvider>
    </AuthProvider>
  );
};

export default App;
