import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faServer, 
  faCloud, 
  faUser, 
  faHashtag, 
  faMapMarkerAlt, 
  faMicrochip, 
  faNetworkWired, 
  faGlobe, 
  faShieldAlt, 
  faKey, 
  faDesktop 
} from '@fortawesome/free-solid-svg-icons';
import { fetchLocations, fetchResources, fetchPrivateNetworks, fetchNetworks, fetchSecurityGroups, fetchKeypairs, fetchOSImages, createVM } from '../utils/apis';

function VMCreateForm({ initialNetworkId }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    location: '',
    resource: '',
    privateNetwork: initialNetworkId || '',
    network: '',
    securityGroup: '',
    pemkey: '',
    os: ''
  });

  const [options, setOptions] = useState({
    locations: [],
    resources: [],
    privateNetworks: [],
    networks: [],
    securityGroups: [],
    keypairs: [],
    osImages: []
  });

  useEffect(() => {
    const fetchOptions = async () => {
      const [
        locations,
        resources,
        privateNetworks,
        networks,
        securityGroups,
        keypairs,
        osImages
      ] = await Promise.all([
        fetchLocations(),
        fetchResources(),
        fetchPrivateNetworks(),
        fetchNetworks(),
        fetchSecurityGroups(),
        fetchKeypairs(),
        fetchOSImages()
      ]);

      setOptions({
        locations,
        resources,
        privateNetworks,
        networks,
        securityGroups,
        keypairs,
        osImages
      });

      // If initialNetworkId is provided, set the privateNetwork value
      if (initialNetworkId) {
        setFormData(prevData => ({
          ...prevData,
          privateNetwork: initialNetworkId
        }));
      }
    };

    fetchOptions();
  }, [initialNetworkId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createVM(formData);
      console.log('VM created:', result);
      // Handle success (e.g., show success message, redirect to VM list)
    } catch (error) {
      console.error('Error creating VM:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="vm-create-container">
      <div className="vm-create-header">
        <FontAwesomeIcon icon={faCloud} className="cloud-icon" />
        <h1>Create Virtual Machine</h1>
      </div>
      <p className="vm-create-description">Configure your VM instance by selecting options below.</p>
      <form className="vm-create-form" onSubmit={handleSubmit}>
        <div className="form-layout">
          <div className="left-section">
            <div className="form-group">
              <label htmlFor="name">
                <FontAwesomeIcon icon={faUser} className="field-icon" />
                VM Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter VM name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">
                <FontAwesomeIcon icon={faHashtag} className="field-icon" />
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="field-icon" />
                Location
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="">Select location</option>
                {options.locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="right-section">
            <div className="form-group">
              <label htmlFor="resource">
                <FontAwesomeIcon icon={faMicrochip} className="field-icon" />
                Resource
              </label>
              <p className="field-description">자원의 사양을 선택하세요.</p>
              <select
                id="resource"
                name="resource"
                value={formData.resource}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                {options.resources.map((resource) => (
                  <option key={resource.id} value={resource.id}>
                    {resource.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="privateNetwork">
                <FontAwesomeIcon icon={faNetworkWired} className="field-icon" />
                Private Network
              </label>
              <p className="field-description">생성한 서브넷을 선택하세요.</p>
              <select
                id="privateNetwork"
                name="privateNetwork"
                value={formData.privateNetwork}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                {options.privateNetworks.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name} ({network.cidr})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="network">
                <FontAwesomeIcon icon={faGlobe} className="field-icon" />
                Network
              </label>
              <p className="field-description">공인아이피 또는 연구실사설망 아이피를 선택하세요.</p>
              <select
                id="network"
                name="network"
                value={formData.network}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                {options.networks.map((network) => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="securityGroup">
                <FontAwesomeIcon icon={faShieldAlt} className="field-icon" />
                Security Group
              </label>
              <p className="field-description">보안정책을 선택하세요.</p>
              <select
                id="securityGroup"
                name="securityGroup"
                value={formData.securityGroup}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                {options.securityGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pemkey">
                <FontAwesomeIcon icon={faKey} className="field-icon" />
                Pemkey
              </label>
              <p className="field-description">VM 접속을 위한 keypair를 선택하세요.</p>
              <select
                id="pemkey"
                name="pemkey"
                value={formData.pemkey}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                {options.keypairs.map((keypair) => (
                  <option key={keypair.id} value={keypair.id}>
                    {keypair.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="os">
                <FontAwesomeIcon icon={faDesktop} className="field-icon" />
                OS
              </label>
              <p className="field-description">운영체제를 선택하세요.</p>
              <select
                id="os"
                name="os"
                value={formData.os}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                {options.osImages.map((os) => (
                  <option key={os.id} value={os.id}>
                    {os.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="create-vm-btn">
          <FontAwesomeIcon icon={faServer} /> Create VM
        </button>
      </form>
    </div>
  );
}

export default VMCreateForm;
