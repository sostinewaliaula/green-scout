import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanityClient';

interface Button {
  text?: string;
  link?: string;
}

interface Audience {
  title: string;
  description: string;
}

interface CtaBlock {
  _type: 'blockCta';
  title?: string;
  subtitle?: string;
  primaryButton?: Button;
  secondaryButton?: Button;
  audiences?: Audience[];
}

export function CallToActionSectionCms() {
  const [ctaBlock, setCtaBlock] = useState<CtaBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Home page and get the blockCta
    sanityClient
      .fetch<{ content: CtaBlock[] }>(
        `*[_type == "page" && slug.current == "/"][0]{
          content[_type == "blockCta"]{
            _type,
            title,
            subtitle,
            primaryButton,
            secondaryButton,
            audiences[]{
              title,
              description
            }
          }
        }`
      )
      .then((data) => {
        const ctaBlockData = data?.content?.[0];
        setCtaBlock(ctaBlockData || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching CTA:', err);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-white">Loading...</div>
        </div>
      </section>
    );
  }

  // If no CTA found, show empty state
  if (!ctaBlock) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Green Scout Movement Today
          </h2>
          <p className="text-gray-100">
            Call-to-action content will appear here once added in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-600 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {ctaBlock.title || 'Join the Green Scout Movement Today'}
        </h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-green-50">
          {ctaBlock.subtitle || "Be part of Kenya's youth-led environmental transformation. Together, we can create a greener, more sustainable future."}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {ctaBlock.primaryButton?.text && (
            <Link
              to={ctaBlock.primaryButton.link || '/get-involved'}
              className="px-8 py-3 bg-white text-purple-700 rounded-full font-medium hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
            >
              {ctaBlock.primaryButton.text}
            </Link>
          )}
          {ctaBlock.secondaryButton?.text && (
            <Link
              to={ctaBlock.secondaryButton.link || '/get-involved'}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all transform hover:scale-105"
            >
              {ctaBlock.secondaryButton.text}
            </Link>
          )}
        </div>
        {ctaBlock.audiences && ctaBlock.audiences.length > 0 && (
          <div className="mt-12 pt-12 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {ctaBlock.audiences.map((audience, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3 className="text-xl font-bold mb-3">{audience.title}</h3>
                <p className="text-green-50">{audience.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

