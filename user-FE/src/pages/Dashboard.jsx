import React from 'react';

export default function Dashboard({ user }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      {user && user.userName ? (
        <p>Welcome, <strong>{user.userName}</strong>!</p>
      ) : (
        <p>Welcome!</p>
      )}
    </div>
  );
}