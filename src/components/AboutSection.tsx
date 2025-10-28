import React, { useEffect, useState } from 'react';
import { fetchSanity } from '../cms/sanityRest';

type CmsStat = { value?: string; label?: string; sublabel?: string; theme?: 'green' | 'purple' };

type CmsAbout = {
  title?: string;
  image?: { asset?: { url?: string } };
  intro?: Array<{ children?: Array<{ text?: string }> }>;
  stats?: CmsStat[];
};

export function AboutSection() {
  const [cms, setCms] = useState<CmsAbout | null>(null);

  useEffect(() => {
    const q = `*[_type == "page" && (slug.current == "/" || slug.current == "home" || slug.current == "index")][0]{
      "about": content[_type == "blockAbout"][0]{
        title,
        image{asset->{url}},
        intro,
        stats
      }
    }`;
    fetchSanity<{ about?: CmsAbout }>(q)
      .then((res) => {
        if (res?.about) setCms(res.about);
      })
      .catch(() => {
        // ignore; will use static fallback
      });
  }, []);

  const introText = (cms?.intro || []).map(b => (b?.children || []).map(c => c?.text).join(' ')).join('\n\n');

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-green-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
          {cms?.title || 'About Green Scout'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-700 hover:scale-[1.02]">
            <img
              src={cms?.image?.asset?.url || 'https://images.unsplash.com/photo-1611187401884-dca23c18dc6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
              alt="About Green Scout"
              className="w-full h-auto object-cover max-h-[600px] rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <div className="space-y-4">
              {introText ? (
                introText.split('\n\n').map((p, i) => (
                  <p key={i} className="text-lg text-gray-700 leading-relaxed">{p}</p>
                ))
              ) : (
                <>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Green Scout is an initiative by WSPU Kenya that empowers young people to take leadership roles in climate action through tree planting in schools across Kenya.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our mission is to create a generation of environmentally conscious youth who understand the importance of forests and take practical steps to increase Kenya's tree cover.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Through education, hands-on activities, and community engagement, Green Scouts learn about native tree species, sustainable forestry practices, and the critical role that trees play in mitigating climate change.
                  </p>
                </>
              )}
            </div>
            <div className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(cms?.stats && cms.stats.length > 0 ? cms.stats : [
                  { value: '5K+', label: 'Trees Planted', sublabel: 'Since program launch', theme: 'green' },
                  { value: '50+', label: 'Schools Engaged', sublabel: 'Across Kenya', theme: 'purple' }
                ]).map((s, i) => (
                  <div key={i} className={`rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow ${s.theme === 'purple' ? 'bg-purple-200' : 'bg-green-200'}`}>
                    <div className={`${s.theme === 'purple' ? 'bg-purple-600' : 'bg-green-600'} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 transform transition-transform hover:scale-110`}>
                      {s.value}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium">{s.label}</p>
                      <p className="text-sm text-gray-600">{s.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}