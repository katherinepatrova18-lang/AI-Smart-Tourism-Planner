import React, { useEffect } from 'react';
import { useUI } from '../context/UIContext';

const NotificationContainer = () => {
  const { notifications } = useUI();

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        maxWidth: '400px'
      }}
    >
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`toast toast-${notification.type}`}
          style={{
            animation: 'slideIn 0.3s ease'
          }}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
