import React from 'react';
import { useNavigate } from 'react-router-dom';
import VMInfo from './VMInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import '../styles/PrivateNetwork.css';

function PrivateNetwork({ network }) {
  const navigate = useNavigate();

  const handleAddVM = () => {
    // '/vm/create' 페이지로 이동하면서 network.id를 state로 전달
    navigate('/vm/create', { state: { networkId: network.id } });
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
