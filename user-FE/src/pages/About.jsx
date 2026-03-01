import React from 'react';

export default function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: 400, margin: '0 auto' }}>
      <h1>About User</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="userName" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
            User Name:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter user name"
            style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
            
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
            
          />
        </div>
        <div>
          <label htmlFor="id" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
            ID:
          </label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Enter user ID"
            style={{ width: '100%', padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
            
          />
        </div>
      </form>
    </div>
  );
}
