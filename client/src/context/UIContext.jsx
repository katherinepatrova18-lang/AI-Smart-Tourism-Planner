import React, { createContext, useState, useContext } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <UIContext.Provider value={{
      theme,
      setTheme,
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      notifications,
      addNotification,
      loading,
      setLoading
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
};
