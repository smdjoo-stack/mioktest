import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Neon Identity',
    category: 'Brand Design',
    imageUrl: 'https://picsum.photos/seed/100/800/600',
    description: 'Corporate identity for a future-tech startup.',
  },
  {
    id: '2',
    title: 'Fluid Motion',
    category: 'Motion Graphics',
    imageUrl: 'https://picsum.photos/seed/205/800/800',
    description: 'Experimental fluid dynamics simulation.',
  },
  {
    id: '3',
    title: 'Urban Rhythm',
    category: 'Photography',
    imageUrl: 'https://picsum.photos/seed/333/800/1000',
    description: 'Documenting the silence of the city.',
  },
  {
    id: '4',
    title: 'Zenith UI',
    category: 'Interface',
    imageUrl: 'https://picsum.photos/seed/412/800/600',
    description: 'Minimalist meditation application.',
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 px-6 lg:px-12 max-w-[1400px] mx-auto border-t-2 border-black">
      <div className="flex flex-col md:flex-row justify-between items-start mb-20">
        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-6 md:mb-0">
          Selected<br/>Works
        </h2>
        <p className="text-xl md:text-2xl font-bold text-black max-w-md leading-relaxed mt-4">
          A collection of digital experiences crafted with bold precision and algorithmic creativity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {projects.map((project) => (
          <div key={project.id} className="group cursor-pointer">
            <div className="overflow-hidden mb-6 border-2 border-black rounded-none bg-black">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <h3 className="text-3xl font-black text-black mb-1">{project.title}</h3>
                <p className="text-lg font-bold text-black/70">{project.category}</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;