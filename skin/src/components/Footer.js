import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CloudPlatform</h3>
          <p>Professional cloud solutions for your business</p>
        </div>
        <div className="footer-section">
          <h3>Products</h3>
          <ul>
            <li><a href="/vm">Virtual Machines</a></li>
            <li><a href="/kubernetes">Kubernetes</a></li>
            <li><a href="/storage">Cloud Storage</a></li>
            <li><a href="/networking">Networking</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="/docs">Documentation</a></li>
            <li><a href="/api">API Reference</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CloudPlatform. All rights reserved.</p>
        <div className="footer-legal">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
