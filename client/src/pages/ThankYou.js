import React from 'react';
import { Link } from 'react-router-dom';

function ThankYou() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Thank you for your order! 🎉</h2>
      <p>We’ll start polishing your forks immediately.</p>
      <Link to="/">← Back to shop</Link>
    </div>
  );
}

export default ThankYou;
