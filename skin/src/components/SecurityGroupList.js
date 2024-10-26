import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/SecurityGroupList.css';

function SecurityGroupList({ securityGroups, onAddPolicy, onDeletePolicy }) {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleAddPolicy = () => {
    // Implement add policy logic here
    console.log('Add policy to group:', selectedGroup);
  };

  const handleDeletePolicy = (policyId) => {
    // Implement delete policy logic here
    console.log('Delete policy:', policyId, 'from group:', selectedGroup);
  };

  return (
    <div className="security-group-list">
      
      <div className="security-group-grid">
        {securityGroups.map((group) => (
          <div key={group.id} className="security-group-card">
            <h3>{group.name}</h3>
            <ul className="policy-list">
              {group.policies.map((policy) => (
                <li key={policy.id} className="policy-item">
                  {policy.description}
                  <button className="delete-policy-btn" onClick={() => handleDeletePolicy(policy.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
            <button className="add-policy-btn" onClick={() => setSelectedGroup(group.id)}>
              <FontAwesomeIcon icon={faPlus} /> Add Policy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecurityGroupList;
