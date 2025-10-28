import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from 'lucide-react';
import sanityClient from '../sanityClient';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
}

interface TestimonialsBlock {
  _type: 'blockTestimonials';
  title?: string;
  testimonials?: Testimonial[];
}

export function TestimonialsSectionCms() {
  const [testimonialsBlock, setTestimonialsBlock] = useState<TestimonialsBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch the Home page and get the blockTestimonials
    sanityClient
      .fetch<{ content: TestimonialsBlock[] }>(
        `*[_type == "page" && slug.current == "/"][0]{
          content[_type == "blockTestimonials"]{
            _type,
            title,
            testimonials[]{
              quote,
              name,
              title,
              image{asset->{url}}
            }
          }
        }`
      )
      .then((data) => {
        const testimonialBlock = data?.content?.[0];
        setTestimonialsBlock(testimonialBlock || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching testimonials:', err);
        setLoading(false);
      });
  }, []);

  const nextTestimonial = () => {
    if (!testimonialsBlock?.testimonials) return;
    setCurrentIndex((prev) =>
      prev === testimonialsBlock.testimonials!.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    if (!testimonialsBlock?.testimonials) return;
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsBlock.testimonials!.length - 1 : prev - 1
    );
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-green-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600 dark:text-gray-400">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  // If no testimonials found, show empty state
  if (!testimonialsBlock || !testimonialsBlock.testimonials || testimonialsBlock.testimonials.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-green-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
            What People Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Testimonials will appear here once added in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonialsBlock.testimonials[currentIndex];

  return (
    <section className="py-20 px-4 md:px-8 bg-green-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-700 dark:text-green-400">
          {testimonialsBlock.title || 'What People Say'}
        </h2>
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-6 md:p-10 overflow-hidden">
          <div className="absolute top-6 left-6 text-green-200 dark:text-green-900/40">
            <QuoteIcon className="w-16 h-16 md:w-24 md:h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/4 flex flex-col items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-green-100 dark:border-green-900/40">
                  {currentTestimonial.image?.asset?.url ? (
                    <img
                      src={currentTestimonial.image.asset.url}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-900/50 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-4xl">👤</span>
                    </div>
                  )}
                </div>
                <div className="flex mt-6 gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-green-700 dark:text-green-400" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-green-100 dark:bg-green-900/40 hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-green-700 dark:text-green-400" />
                  </button>
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-6">
                  "{currentTestimonial.quote}"
                </p>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-purple-700 dark:text-purple-400">{currentTestimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {testimonialsBlock.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-green-700 dark:bg-green-400 w-6' : 'bg-green-200 dark:bg-green-900/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
