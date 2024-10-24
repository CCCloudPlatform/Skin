import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/FloatingIPList.css';

function FloatingIPList({ floatingIPs, onRequestIP }) {
  return (
    <div className="floating-ip-list">
      
      <div className="floating-ip-grid">
        {floatingIPs.map((ip) => (
          <div key={ip.id} className="floating-ip-card">
            <div className="ip-icon">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className="ip-details">
              <div className="ip-address">{ip.address}</div>
              <div className="ip-status" data-status={ip.status.toLowerCase()}>{ip.status}</div>
            </div>
            <button className="delete-ip-btn">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FloatingIPList;
