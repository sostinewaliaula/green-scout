import React from 'react';
export function ScoutHeroSection() {
  return <section className="relative w-full h-[60vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" alt="Green Scouts in action" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-purple-900/70" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Meet Our <span className="text-green-400">Green</span>{' '}
          <span className="text-purple-400">Scouts</span>
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
          Young environmental leaders shaping Kenya's sustainable future
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-3xl font-bold text-white">1,200+</p>
            <p className="text-sm text-green-200">Active Scouts</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-3xl font-bold text-white">128</p>
            <p className="text-sm text-green-200">Schools</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
            <p className="text-3xl font-bold text-white">47</p>
            <p className="text-sm text-green-200">Counties</p>
          </div>
        </div>
      </div>
    </section>;
}