import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

interface TimelineStep {
  stepNumber: number;
  title: string;
  description: string;
  colorTheme?: 'green' | 'purple';
}

interface BlockImpactTimeline {
  _type: 'blockImpactTimeline';
  title?: string;
  steps?: TimelineStep[];
}

export function ImpactTimelineSectionCms() {
  const [timelineBlock, setTimelineBlock] = useState<BlockImpactTimeline | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == "impact"][0]{
          content[]{
            _type == "blockImpactTimeline" => {
              ...,
              steps[]{
                stepNumber,
                title,
                description,
                colorTheme
              }
            }
          }
        }`
      )
      .then((data) => {
        const block = data?.content?.find((b: any) => b._type === 'blockImpactTimeline');
        setTimelineBlock(block || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching impact timeline block:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400">Loading timeline...</div>
      </section>
    );
  }

  if (!timelineBlock || !timelineBlock.steps || timelineBlock.steps.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400 px-4">
          No timeline configured yet. Please add an "Impact Timeline Block" to your Impact page in Sanity Studio.
        </div>
      </section>
    );
  }

  // Sort steps by step number
  const sortedSteps = [...timelineBlock.steps].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <section className="py-16 px-4 md:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {timelineBlock.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-purple-700 dark:text-purple-400">
            {timelineBlock.title}
          </h2>
        )}
        <div className="space-y-8">
          {sortedSteps.map((step, index) => {
            const isGreen = step.colorTheme === 'green';
            const bgColor = isGreen ? 'bg-green-500' : 'bg-purple-500';
            const textColor = isGreen ? 'text-green-700 dark:text-green-400' : 'text-purple-700 dark:text-purple-400';
            const isLastStep = index === sortedSteps.length - 1;

            return (
              <div key={index} className="flex gap-6">
                {/* Timeline marker with connecting line */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full ${bgColor} text-white flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                    {step.stepNumber}
                  </div>
                  {!isLastStep && (
                    <div className="w-1 h-full bg-green-200 min-h-[60px]"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <h3 className={`text-xl font-bold mb-2 ${textColor}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

