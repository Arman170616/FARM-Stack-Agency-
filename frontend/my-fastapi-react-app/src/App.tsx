import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Service from './components/Service';
import Portfolio from './components/Portfolio';
import Testimonial from './components/Testimonial';
import Home from './components/Home';
import Navbar from './components/Navbar'; // Import the Navbar component


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          
          <Navbar />
        </header> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Service />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
