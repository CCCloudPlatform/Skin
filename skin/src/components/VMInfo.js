import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faMemory, faNetworkWired, faKey, faShieldAlt, faPowerOff, faRedo, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/VMInfo.css';

function VMInfo({ vm }) {
  const handleShutdown = () => console.log('Shutdown VM:', vm.name);
  const handleReboot = () => console.log('Reboot VM:', vm.name);
  const handlePowerOn = () => console.log('Power on VM:', vm.name);
  const handleDelete = () => console.log('Delete VM:', vm.name);

  return (
    <div className="vm-info">
      <div className="vm-header">
        <h3>{vm.name}</h3>
        <div className="vm-status" data-status={vm.status.toLowerCase()}>{vm.status}</div>
      </div>
      <div className="vm-details">
        <div className="vm-detail"><FontAwesomeIcon icon={faServer} /> <span>Flavor:</span> {vm.flavor}</div>
        <div className="vm-detail"><FontAwesomeIcon icon={faKey} /> <span>Keypair:</span> {vm.keypairName}</div>
        <div className="vm-detail"><FontAwesomeIcon icon={faShieldAlt} /> <span>Security Groups:</span> {vm.securityGroups.join(', ')}</div>
        <div className="vm-detail"><FontAwesomeIcon icon={faNetworkWired} /> <span>IP:</span> {vm.network}</div>
      </div>
      <div className="vm-controls">
        <button onClick={handleShutdown} className="vm-control-btn shutdown">
          <FontAwesomeIcon icon={faPowerOff} /> Shutdown
        </button>
        <button onClick={handleReboot} className="vm-control-btn reboot">
          <FontAwesomeIcon icon={faRedo} /> Reboot
        </button>
        <button onClick={handlePowerOn} className="vm-control-btn power-on">
          <FontAwesomeIcon icon={faPlay} /> Power On
        </button>
        <button onClick={handleDelete} className="vm-control-btn delete">
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
}

export default VMInfo;
