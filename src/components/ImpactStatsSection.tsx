import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';
import { LeafIcon, UsersIcon, SchoolIcon, AwardIcon, GlobeIcon, TreePineIcon } from 'lucide-react';

interface Stat {
  label?: string;
  value?: string;
  icon?: string;
}

interface StatsBlock {
  _type: 'blockStats';
  title?: string;
  stats?: Stat[];
}

// Map icon names to Lucide icons
const iconMap: Record<string, React.ComponentType<any>> = {
  leaf: LeafIcon,
  tree: TreePineIcon,
  users: UsersIcon,
  school: SchoolIcon,
  award: AwardIcon,
  globe: GlobeIcon,
};

export function ImpactStatsSection() {
  const [statsBlock, setStatsBlock] = useState<StatsBlock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the Home page and get the blockStats with title "Our Impact at a Glance"
    sanityClient
      .fetch<{ content: StatsBlock[] }>(
        `*[_type == "page" && slug.current == "/"][0]{
          content[_type == "blockStats"]{
            _type,
            title,
            stats[]{label, value, icon}
          }
        }`
      )
      .then((data) => {
        // Find the stats block with "Our Impact at a Glance" title or use the first one
        const impactBlock = data?.content?.find(
          (block) => block.title?.includes('Impact') || block.title?.includes('Glance')
        ) || data?.content?.[0];
        
        setStatsBlock(impactBlock || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600">Loading impact stats...</div>
        </div>
      </section>
    );
  }

  // If no stats found, show empty state
  if (!statsBlock || !statsBlock.stats || statsBlock.stats.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-700">
            Our Impact at a Glance
          </h2>
          <p className="text-gray-600">
            Impact statistics will appear here once added in Sanity Studio.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">
          {statsBlock.title || 'Our Impact at a Glance'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {statsBlock.stats.map((stat, index) => {
            // Determine color theme (alternate between green and purple)
            const isGreen = index % 2 === 0;
            const bgColor = isGreen ? 'bg-green-100' : 'bg-purple-100';
            const textColor = isGreen ? 'text-green-600' : 'text-purple-600';
            const headingColor = isGreen ? 'text-green-700' : 'text-purple-700';

            // Get the icon component if it's a name, otherwise treat as emoji
            const IconComponent = stat.icon ? iconMap[stat.icon.toLowerCase()] : null;
            const isEmoji = stat.icon && !IconComponent && stat.icon.length <= 4;

            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
              >
                {stat.icon && (
                  <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mb-4`}>
                    {IconComponent ? (
                      <IconComponent className={`w-8 h-8 ${textColor}`} />
                    ) : isEmoji ? (
                      <span className="text-4xl" role="img" aria-label={stat.label}>
                        {stat.icon}
                      </span>
                    ) : null}
                  </div>
                )}
                <h3 className={`text-3xl font-bold ${headingColor} mb-2`}>
                  {stat.value}
                </h3>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Every tree planted is a step toward a greener future. Join us in our
            mission to combat climate change and create sustainable ecosystems
            across Kenya.
          </p>
        </div>
      </div>
    </section>
  );
}

