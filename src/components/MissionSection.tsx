import React, { useEffect, useState } from 'react';
import { fetchSanity } from '../cms/sanityRest';

type CmsMission = {
  title?: string;
  missionTitle?: string;
  missionBody?: string;
  visionTitle?: string;
  visionBody?: string;
  images?: Array<{ asset?: { url?: string } }>;
};

export function MissionSection() {
  const [cms, setCms] = useState<CmsMission | null>(null);

  useEffect(() => {
    const q = `*[_type == "page" && (slug.current == "/" || slug.current == "home" || slug.current == "index")][0]{
      "mission": content[_type == "blockMission"][0]{
        title, missionTitle, missionBody, visionTitle, visionBody, images[]{asset->{url}}
      }
    }`;
    fetchSanity<{ mission?: CmsMission }>(q).then(res => {
      if (res?.mission) setCms(res.mission);
    });
  }, []);

  const images = cms?.images?.map(i => i.asset?.url).filter(Boolean) as string[] | undefined;

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
              {cms?.title || 'Our Mission & Vision'}
            </h2>
            <div className="bg-green-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                {cms?.missionTitle || 'Our Mission'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cms?.missionBody || 'To empower young Kenyans with the knowledge, skills, and opportunities to take leadership roles in environmental conservation through tree planting and sustainable practices in their schools and communities.'}
              </p>
            </div>
            <div className="bg-purple-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-700 mb-3">
                {cms?.visionTitle || 'Our Vision'}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cms?.visionBody || 'A green Kenya where youth-led environmental initiatives create resilient ecosystems, combat climate change, and foster sustainable development across all counties.'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(images && images.length ? images : [
              'https://images.unsplash.com/photo-1552084117-56a987666449?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1624958723474-564d8770f0c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            ]).slice(0,4).map((src, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                <img src={src} alt="" className="w-full h-auto object-cover max-h-[250px] hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}