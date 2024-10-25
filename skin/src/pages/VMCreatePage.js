import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import VMCreateForm from '../components/VMCreateForm';
import '../styles/VMCreatePage.css';

function VMCreatePage() {
  return (
    <div className="vm-create-page">
      <Nav />
      <main className="vm-create-content">
        <VMCreateForm />
      </main>
      <Footer />
    </div>
  );
}

export default VMCreatePage;
