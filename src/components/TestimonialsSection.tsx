import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from 'lucide-react';
export function TestimonialsSection() {
  const testimonials = [{
    quote: 'Green Scout has transformed our school environment completely. Our students are now passionate environmentalists who understand the importance of trees in fighting climate change.',
    name: 'Margaret Odhiambo',
    title: 'Principal, Nairobi Green Academy',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  }, {
    quote: "Being a Green Scout has taught me leadership skills and given me purpose. I'm proud that the trees I've planted will benefit my community for generations to come.",
    name: 'James Kimani',
    title: 'Student, Nakuru High School',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  }, {
    quote: "Partnering with Green Scout has been a perfect way for our company to make a tangible impact on Kenya's environment while engaging our employees in meaningful community service.",
    name: 'Sarah Mwangi',
    title: 'CSR Manager, EcoSolutions Kenya',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  }];
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextTestimonial = () => {
    setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
  };
  const prevTestimonial = () => {
    setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
  };
  return <section className="py-20 px-4 md:px-8 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-700">
          What People Say
        </h2>
        <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-10 overflow-hidden">
          <div className="absolute top-6 left-6 text-green-200">
            <QuoteIcon className="w-16 h-16 md:w-24 md:h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/4 flex flex-col items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-green-100">
                  <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
                </div>
                <div className="flex mt-6 gap-2">
                  <button onClick={prevTestimonial} className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors" aria-label="Previous testimonial">
                    <ChevronLeftIcon className="w-5 h-5 text-green-700" />
                  </button>
                  <button onClick={nextTestimonial} className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors" aria-label="Next testimonial">
                    <ChevronRightIcon className="w-5 h-5 text-green-700" />
                  </button>
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <p className="text-xl md:text-2xl text-gray-700 italic mb-6">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-purple-700">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-green-700 w-6' : 'bg-green-200'}`} aria-label={`Go to testimonial ${index + 1}`} />)}
          </div>
        </div>
      </div>
    </section>;
}