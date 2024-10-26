import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import VMCreateForm from '../components/VMCreateForm';
import '../styles/VMCreatePage.css';

function VMCreatePage() {
  const location = useLocation();
  const networkId = location.state?.networkId;

  return (
    <div className="vm-create-page">
      <Nav />
      <main className="vm-create-content">
        <VMCreateForm initialNetworkId={networkId} />
      </main>
      <Footer />
    </div>
  );
}

export default VMCreatePage;
