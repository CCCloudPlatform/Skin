import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import ServiceOverview from './pages/ServiceOverview';
import VMMainPage from './pages/VMMainPage';
import VMCreatePage from './pages/VMCreatePage';
import './App.css';


// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServiceOverview />} />
            <Route path="/vm" element={<VMMainPage />} />
            <Route path="/vm/create" element={<VMCreatePage />} />
            {/* Add more routes here as needed */}
          </Routes>
        
      </Router>
    </QueryClientProvider>
  );
}

export default App;

