import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import ServiceOverview from './pages/ServiceOverview';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service-overview" element={<ServiceOverview />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
