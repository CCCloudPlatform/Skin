import React from 'react';
import VMInfo from './VMInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import '../styles/PrivateNetwork.css';

function PrivateNetwork({ network }) {
  const handleAddVM = () => {
    console.log('Add VM to network:', network.id);
  };

  return (
    <div className="private-network">
      <div className="network-header">
        <FontAwesomeIcon icon={faNetworkWired} className="network-icon" />
        <div className="network-info">
          <h2>{network.name}</h2>
          <p className="network-cidr">CIDR: {network.cidr}</p>
        </div>
      </div>
      <div className="vm-list">
        {network.vms.map((vm) => (
          <VMInfo key={vm.id} vm={vm} />
        ))}
        <button className="add-vm-btn" onClick={handleAddVM}>
          <FontAwesomeIcon icon={faPlus} /> Add VM
        </button>
      </div>
    </div>
  );
}

export default PrivateNetwork;
