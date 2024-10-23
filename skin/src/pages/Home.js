import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <Nav isLoggedIn={false} />
      <main className="home-content">
        <h1>Welcome to Our Platform</h1>
        <p>Main content will be added here.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
