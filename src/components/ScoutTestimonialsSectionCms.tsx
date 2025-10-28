import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

type ImageAsset = { asset?: { url?: string } };

interface ScoutTestimonial {
  quote: string;
  scoutName: string;
  scoutLevel?: string;
  age?: number;
  school?: string;
  image?: ImageAsset;
}

interface LeaderQuote {
  quote: string;
  name: string;
  title: string;
}

interface BlockScoutTestimonials {
  _type: 'blockScoutTestimonials';
  title?: string;
  subtitle?: string;
  testimonials?: ScoutTestimonial[];
  leaderQuote?: LeaderQuote;
}

export function ScoutTestimonialsSectionCms() {
  const [testimonialsBlock, setTestimonialsBlock] = useState<BlockScoutTestimonials | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "scouts"][0]{
          content[]{
            _type == "blockScoutTestimonials" => {
              ...,
              testimonials[]{
                quote,
                scoutName,
                scoutLevel,
                age,
                school,
                image{asset->{url}}
              },
              leaderQuote{quote, name, title}
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockScoutTestimonials');
        setTestimonialsBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching scout testimonials block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-green-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600">Loading testimonials...</div>
      </section>
    );
  }

  if (!testimonialsBlock || !testimonialsBlock.testimonials || testimonialsBlock.testimonials.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-green-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600 px-4">
          No scout testimonials configured yet. Please add a "Scout Testimonials Block" to your Scouts page in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {testimonialsBlock.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              {testimonialsBlock.title}
            </h2>
          )}
          {testimonialsBlock.subtitle && (
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {testimonialsBlock.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonialsBlock.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                {testimonial.image?.asset?.url ? (
                  <img
                    src={testimonial.image.asset.url}
                    alt={testimonial.scoutName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-purple-100 flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-bold text-gray-900">
                    {testimonial.scoutName}
                  </h3>
                  {testimonial.scoutLevel && testimonial.age && (
                    <p className="text-sm text-green-700">
                      {testimonial.scoutLevel}, Age {testimonial.age}
                    </p>
                  )}
                  {testimonial.school && (
                    <p className="text-sm text-gray-600">{testimonial.school}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonialsBlock.leaderQuote && (
          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-purple-600">
            <p className="text-lg italic text-gray-700 mb-4">
              "{testimonialsBlock.leaderQuote.quote}"
            </p>
            <div className="text-right">
              <p className="font-bold text-gray-900">
                — {testimonialsBlock.leaderQuote.name}
              </p>
              <p className="text-sm text-purple-700">
                {testimonialsBlock.leaderQuote.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

