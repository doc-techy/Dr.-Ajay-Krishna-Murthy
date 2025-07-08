'use client';

import { useRef, useState } from 'react';

export default function SpecializationsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const specializations = [
    {
      title: 'Paediatric Lacrimal Disorders',
      subtitle: 'Endoscopic/External DCR',
      description: 'Expert management of tear drainage problems in children using advanced endoscopic and external dacryocystorhinostomy techniques',
      icon: '👶',
      gradient: 'from-blue-500 to-indigo-600',
      bgLight: 'from-blue-50 to-indigo-50',
      features: ['Minimally invasive procedures', 'Child-friendly approach', 'High success rates']
    },
    {
      title: 'Eyelid Cosmetic Surgeries',
      subtitle: 'Aesthetic Enhancement',
      description: 'Advanced blepharoplasty and cosmetic procedures to rejuvenate the eye area while maintaining natural appearance',
      icon: '✨',
      gradient: 'from-purple-500 to-pink-600',
      bgLight: 'from-purple-50 to-pink-50',
      features: ['Upper & lower blepharoplasty', 'Ptosis correction', 'Natural results']
    },
    {
      title: 'Orbital Tumors & Decompression',
      subtitle: 'Minimal Invasive Approach',
      description: 'State-of-the-art minimal invasive techniques for orbital tumor removal and thyroid eye disease decompression',
      icon: '🔬',
      gradient: 'from-teal-500 to-cyan-600',
      bgLight: 'from-teal-50 to-cyan-50',
      features: ['Minimal scarring', 'Faster recovery', 'Preserve vision']
    },
    {
      title: 'Eyelid & Socket Reconstruction',
      subtitle: 'Complex Reconstructive Surgery',
      description: 'Comprehensive reconstruction of eyelids and eye sockets following trauma, tumor removal, or congenital defects',
      icon: '🏗️',
      gradient: 'from-amber-500 to-orange-600',
      bgLight: 'from-amber-50 to-orange-50',
      features: ['Functional restoration', 'Aesthetic outcomes', 'Custom solutions']
    },
    {
      title: 'Eyelid Cancer Management',
      subtitle: 'Removal & Reconstruction',
      description: 'Complete excision of eyelid malignancies with immediate reconstruction to restore function and appearance',
      icon: '🛡️',
      gradient: 'from-red-500 to-rose-600',
      bgLight: 'from-red-50 to-rose-50',
      features: ['Mohs surgery coordination', 'Margin clearance', 'Aesthetic reconstruction']
    },
    {
      title: 'Orbital Fracture Repair',
      subtitle: 'Trauma Management',
      description: 'Expert repair of orbital floor and wall fractures to restore normal eye position and prevent long-term complications',
      icon: '🦴',
      gradient: 'from-emerald-500 to-green-600',
      bgLight: 'from-emerald-50 to-green-50',
      features: ['3D imaging guidance', 'Implant placement', 'Vision preservation']
    },
    {
      title: 'Botox Treatments',
      subtitle: 'Therapeutic & Cosmetic',
      description: 'Precision Botox injections for blepharospasm, hemifacial spasm, and age-related facial rejuvenation',
      icon: '💉',
      gradient: 'from-indigo-500 to-purple-600',
      bgLight: 'from-indigo-50 to-purple-50',
      features: ['Medical conditions', 'Wrinkle reduction', 'Expert technique']
    }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-2 mb-6 shadow-sm border border-gray-100">
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
            <span className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Specialized Expertise</span>
            <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Areas of
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"> Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Dr. Ajay Krishna Murthy specializes in advanced oculoplastic procedures, 
            combining surgical precision with aesthetic excellence to deliver optimal patient outcomes.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scrollToDirection('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 ${
              canScrollLeft ? 'opacity-100 -translate-x-4 hover:scale-110' : 'opacity-0 pointer-events-none translate-x-0'
            }`}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => scrollToDirection('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 ${
              canScrollRight ? 'opacity-100 translate-x-4 hover:scale-110' : 'opacity-0 pointer-events-none -translate-x-0'
            }`}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Gradient Fade Effects */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable Cards Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[380px] group"
              >
                <div className="relative h-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  {/* Top Gradient Bar */}
                  <div className={`h-2 bg-gradient-to-r ${spec.gradient}`}></div>
                  
                  {/* Card Content */}
                  <div className="p-8">
                    {/* Icon and Title Section */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${spec.bgLight} rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-100`}>
                        <span className="text-3xl">{spec.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {spec.title}
                        </h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${spec.gradient} bg-clip-text text-transparent`}>
                          {spec.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {spec.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      {spec.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`w-5 h-5 bg-gradient-to-br ${spec.bgLight} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <div className={`w-2 h-2 bg-gradient-to-r ${spec.gradient} rounded-full`}></div>
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Card Number */}
                    <div className="absolute bottom-4 right-4 text-4xl font-bold text-gray-100">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {specializations.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === 0 ? 'w-8 bg-amber-600' : 'w-2 bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        {/* <div className="mt-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience Expert Care?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Schedule a consultation with Dr. Ajay Krishna Murthy to discuss your specific needs 
              and explore the best treatment options for your condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Book Consultation
              </button>
              <button className="bg-white hover:bg-gray-50 text-amber-700 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-200">
                Learn More
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
} 