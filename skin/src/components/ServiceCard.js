import React from 'react';
import '../styles/ServiceCard.css';

function ServiceCard({ title, description, icon }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default ServiceCard;

