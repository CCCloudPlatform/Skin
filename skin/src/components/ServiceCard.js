import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ServiceCard.css';

function ServiceCard({ title, description, icon, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="service-card" onClick={handleClick}>
      <div className="service-icon">{icon}</div>
      <div className="service-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
