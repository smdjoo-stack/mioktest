import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-6 lg:px-12 max-w-[1400px] mx-auto">
      
      {/* Top Left Date */}
      <div className="absolute top-32 left-6 lg:left-12 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">2024-2025</h2>
      </div>

      {/* Main Title */}
      <div className="flex-grow flex flex-col justify-center items-center z-10 mt-16 md:mt-0">
        <h1 className="text-[15vw] md:text-[180px] leading-[0.85] font-black text-black tracking-tighter text-center animate-slide-up">
          Portfolio
        </h1>
        <p className="mt-8 text-xl md:text-3xl font-bold text-black/80 max-w-3xl text-center leading-relaxed animate-slide-up delay-100">
          해결하는 디자이너 루미나 입니다.<br />
          <span className="opacity-70">Creating intelligent design solutions with Generative AI.</span>
        </p>
      </div>

      {/* Bottom Layout */}
      <div className="w-full flex flex-col md:flex-row justify-between items-end mt-12 md:mt-0 animate-fade-in delay-200">
        <div className="mb-8 md:mb-0">
          <h3 className="text-xl font-bold leading-tight">
            Lumina Studio<br />
            Graphic Designer<br />
            Creative Technologist
          </h3>
          <a href="mailto:hello@lumina.ai" className="text-lg font-medium mt-2 block hover:underline">
            hello@lumina.ai
          </a>
        </div>

        <div>
           <a
            href="#playground"
            className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 text-lg font-bold text-brand-base bg-black rounded-full hover:bg-gray-900 transition-all transform hover:scale-105"
          >
             Try AI Playground
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
             </svg>
          </a>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;