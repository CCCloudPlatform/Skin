import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PrivateNetwork from '../components/PrivateNetwork';
import FloatingIPList from '../components/FloatingIPList';
import SecurityGroupList from '../components/SecurityGroupList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faNetworkWired, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { fetchPrivateNetworks, fetchVMList, fetchFloatingIPs, fetchSecurityGroups } from '../utils/apis';
import '../styles/VMMainPage.css';

function VMMainPage() {
  const [privateNetworks, setPrivateNetworks] = useState([]);
  const [vms, setVMs] = useState([]);
  const [floatingIPs, setFloatingIPs] = useState([]);
  const [securityGroups, setSecurityGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const networks = await fetchPrivateNetworks();
      const vmList = await fetchVMList();
      const ipList = await fetchFloatingIPs();
      const sgList = await fetchSecurityGroups();
setSecurityGroups(sgList);
      setPrivateNetworks(networks);
      setVMs(vmList);
      setFloatingIPs(ipList);
    };
    fetchData() ;
  }, []);
  const networksWithVMs = privateNetworks.map(network => ({
    ...network,
    vms: vms.filter(vm => vm.networkId === network.id)
  }));
  
  const handleCreateNetwork = () => {
    console.log('Create new private network');
  };

  const handleRequestFloatingIP = () => {
    console.log('Request new Floating IP');
  };

  return (
    <div className="vm-main-page">
      <Nav />
      <main className="vm-main-content">
        <div className="dashboard-header">
          <h1>VM Management Dashboard</h1>
          <div className="action-buttons">
            <button className="create-network-btn" onClick={handleCreateNetwork}>
              <FontAwesomeIcon icon={faNetworkWired} /> Create Network
            </button>
            <button className="request-ip-btn" onClick={handleRequestFloatingIP}>
              <FontAwesomeIcon icon={faGlobe} /> Request Floating IP
            </button>
          </div>
        </div>
        <div className="dashboard-content">
          <div className="networks-section">
            <h2><FontAwesomeIcon icon={faNetworkWired} /> Private Networks</h2>
            <div className="networks-grid">
              {networksWithVMs.map((network) => (
                <PrivateNetwork key={network.id} network={network} />
              ))}
            </div>
          </div>
          <div className="side-sections">
            <div className="floating-ips-section">
              <h2><FontAwesomeIcon icon={faGlobe} /> Floating IPs</h2>
              <FloatingIPList floatingIPs={floatingIPs} onRequestIP={handleRequestFloatingIP} />
            </div>
            <div className="security-groups-section">
              <SecurityGroupList securityGroups={securityGroups} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default VMMainPage;
