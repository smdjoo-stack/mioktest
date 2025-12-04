import React from 'react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto border-t-2 border-black mt-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-black text-black mb-6">Lumina.</h2>
          <p className="text-xl font-bold text-black max-w-sm">
            Digital craftsmanship for the modern web.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-black uppercase tracking-wider mb-6 text-black/60">Menu</h4>
          <ul className="space-y-4 font-bold text-lg">
            <li><a href="#portfolio" className="hover:text-white transition-colors">Work</a></li>
            <li><a href="#playground" className="hover:text-white transition-colors">Lab</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-black uppercase tracking-wider mb-6 text-black/60">Social</h4>
          <ul className="space-y-4 font-bold text-lg">
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="mailto:hello@lumina.ai" className="hover:text-white transition-colors">Email</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-20 pt-8 border-t-2 border-black/20 flex flex-col md:flex-row justify-between items-center font-bold text-sm">
        <p>© {new Date().getFullYear()} Lumina Studio.</p>
        <p className="mt-4 md:mt-0">Built with Gemini 3 Pro</p>
      </div>
    </footer>
  );
};

export default Contact;