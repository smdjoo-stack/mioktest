import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Playground from './components/Playground';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-brand-base text-black">
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Playground />
      </main>
      <Contact />
    </div>
  );
}

export default App;