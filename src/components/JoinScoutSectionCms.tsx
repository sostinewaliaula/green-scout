import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';
import { Link } from 'react-router-dom';
import { CheckIcon, ArrowRightIcon } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface ApplyButton {
  text?: string;
  link?: string;
}

interface OrganizationsBox {
  enabled?: boolean;
  heading?: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
}

interface BlockJoinScout {
  _type: 'blockJoinScout';
  title?: string;
  description?: string;
  benefitsHeading?: string;
  benefits?: string[];
  applyButton?: ApplyButton;
  stepsHeading?: string;
  steps?: Step[];
  organizationsBox?: OrganizationsBox;
}

export function JoinScoutSectionCms() {
  const [joinBlock, setJoinBlock] = useState<BlockJoinScout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "scouts"][0]{
          content[]{
            _type == "blockJoinScout" => {
              ...,
              applyButton{text, link},
              steps[]{title, description},
              organizationsBox{enabled, heading, description, linkText, linkUrl}
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockJoinScout');
        setJoinBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching join scout block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-purple-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600">Loading join section...</div>
      </section>
    );
  }

  if (!joinBlock) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-purple-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600 px-4">
          No "Join Scout Section" configured yet. Please add a "Join Scout Section" block to your Scouts page in Sanity Studio.
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-purple-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Main Info */}
          <div>
            {joinBlock.title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                {joinBlock.title}
              </h2>
            )}
            
            {joinBlock.description && (
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {joinBlock.description}
              </p>
            )}

            {joinBlock.benefits && joinBlock.benefits.length > 0 && (
              <div className="mb-8">
                {joinBlock.benefitsHeading && (
                  <h3 className="text-xl font-bold mb-4 text-green-800">
                    {joinBlock.benefitsHeading}
                  </h3>
                )}
                <ul className="space-y-3">
                  {joinBlock.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-3 h-3 text-green-700" />
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {joinBlock.applyButton?.text && (
              <Link
                to={joinBlock.applyButton.link || '/get-involved'}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white rounded-full font-medium hover:from-green-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {joinBlock.applyButton.text}
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Right Column - Steps & Organizations */}
          <div className="space-y-6">
            {/* Steps */}
            {joinBlock.steps && joinBlock.steps.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-8">
                {joinBlock.stepsHeading && (
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    {joinBlock.stepsHeading}
                  </h3>
                )}
                <div className="space-y-6">
                  {joinBlock.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizations Box */}
            {joinBlock.organizationsBox?.enabled && (
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6">
                {joinBlock.organizationsBox.heading && (
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {joinBlock.organizationsBox.heading}
                  </h3>
                )}
                {joinBlock.organizationsBox.description && (
                  <p className="text-gray-700 mb-4">
                    {joinBlock.organizationsBox.description}
                  </p>
                )}
                {joinBlock.organizationsBox.linkText && (
                  <Link
                    to={joinBlock.organizationsBox.linkUrl || '/get-involved'}
                    className="inline-flex items-center gap-2 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                  >
                    {joinBlock.organizationsBox.linkText}
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

