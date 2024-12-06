// UserInfo.js
import React from 'react';

const UserInfo = ({ user, onLogout }) => {
  return (
    <div className="user-info-container">
      <span className="user-welcome">Welcome, {user}</span>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
