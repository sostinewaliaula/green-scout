import React from 'react';

type ImageAsset = { asset?: { url?: string } };

type BlockText = {
  _type: 'blockText';
  heading?: string;
  body?: string;
};

type BlockImage = ImageAsset & { _type: 'blockImage' };

type BlockGallery = {
  _type: 'blockGallery';
  title?: string;
  images?: Array<ImageAsset>;
};

type BlockStats = {
  _type: 'blockStats';
  title?: string;
  stats?: Array<{ label?: string; value?: string; icon?: string }>;
};

type BlockTestimonial = {
  _type: 'blockTestimonial';
  name?: string;
  role?: string;
  quote?: string;
  image?: ImageAsset;
};

type BlockAbout = {
  _type: 'blockAbout';
  title?: string;
  image?: ImageAsset;
  intro?: any[];
  stats?: Array<{ 
    value?: string; 
    label?: string; 
    sublabel?: string; 
    theme?: 'green' | 'purple' 
  }>;
};

type BlockMission = {
  _type: 'blockMission';
  title?: string;
  missionTitle?: string;
  missionBody?: string;
  visionTitle?: string;
  visionBody?: string;
  images?: Array<ImageAsset>;
};

export type CmsBlock = BlockText | BlockImage | BlockGallery | BlockStats | BlockTestimonial | BlockAbout | BlockMission;

export function CmsRenderer({ content }: { content: CmsBlock[] }) {
  return (
    <div className="space-y-12">
      {content?.map((block: CmsBlock, idx: number) => {
        switch (block._type) {
          case 'blockText': {
            const b = block as BlockText;
            return (
              <section key={idx} className="max-w-4xl mx-auto px-4">
                {b.heading && <h2 className="text-3xl font-bold text-green-700 mb-3">{b.heading}</h2>}
                {b.body && <p className="text-gray-700 leading-relaxed">{b.body}</p>}
              </section>
            );
          }
          case 'blockImage': {
            const b = block as BlockImage;
            const src = b.asset?.url;
            if (!src) return null;
            return (
              <div key={idx} className="max-w-5xl mx-auto px-4">
                <img src={src} alt="" className="w-full rounded-xl shadow" />
              </div>
            );
          }
          case 'blockGallery': {
            const b = block as BlockGallery;
            return (
              <section key={idx} className="max-w-6xl mx-auto px-4">
                {b.title && <h3 className="text-2xl font-semibold text-purple-700 mb-4">{b.title}</h3>}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {b.images?.map((img, i) => (
                    <div key={i} className="overflow-hidden rounded-lg shadow bg-white">
                      {img.asset?.url && (
                        <img src={img.asset.url} alt="" className="w-full h-40 object-cover hover:scale-105 transition-transform" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }
          case 'blockStats': {
            const b = block as BlockStats;
            return (
              <section key={idx} className="bg-gradient-to-br from-green-50 via-white to-purple-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                  {b.title && (
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                      {b.title}
                    </h2>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {b.stats?.map((s, i) => (
                      <div 
                        key={i} 
                        className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all duration-300 border-t-4 border-purple-500 hover:shadow-2xl"
                      >
                        {s.icon && (
                          <div className="text-5xl mb-4" role="img" aria-label={s.icon}>
                            {s.icon}
                          </div>
                        )}
                        <div className="text-4xl md:text-5xl font-bold text-purple-700 mb-2">
                          {s.value}
                        </div>
                        <div className="text-gray-800 font-semibold text-lg">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }
          case 'blockTestimonial': {
            const b = block as BlockTestimonial;
            return (
              <blockquote key={idx} className="max-w-4xl mx-auto px-4 bg-white rounded-xl shadow p-6">
                <p className="italic text-gray-700">"{b.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  {b.image?.asset?.url && <img src={b.image.asset.url} alt="" className="w-10 h-10 rounded-full object-cover" />}
                  <div>
                    <div className="font-semibold text-green-700">{b.name}</div>
                    <div className="text-sm text-gray-500">{b.role}</div>
                  </div>
                </div>
              </blockquote>
            );
          }
          case 'blockAbout': {
            const b = block as BlockAbout;
            return (
              <section key={idx} className="bg-gradient-to-br from-green-50 to-purple-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                  {b.title && (
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-green-700 to-purple-700 bg-clip-text text-transparent">
                      {b.title}
                    </h2>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                    {b.image?.asset?.url && (
                      <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={b.image.asset.url} 
                          alt={b.title || 'About'} 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {b.intro?.map((paragraph: any, i: number) => (
                        <p key={i} className="text-lg text-gray-700 leading-relaxed">
                          {paragraph.children?.[0]?.text || ''}
                        </p>
                      ))}
                    </div>
                  </div>

                  {b.stats && b.stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                      {b.stats.map((stat, i) => (
                        <div 
                          key={i} 
                          className={`bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform ${
                            stat.theme === 'purple' 
                              ? 'border-t-4 border-purple-500' 
                              : 'border-t-4 border-green-500'
                          }`}
                        >
                          <div className={`text-4xl font-bold mb-2 ${
                            stat.theme === 'purple' ? 'text-purple-700' : 'text-green-700'
                          }`}>
                            {stat.value}
                          </div>
                          <div className="text-gray-800 font-semibold">{stat.label}</div>
                          {stat.sublabel && (
                            <div className="text-sm text-gray-500 mt-1">{stat.sublabel}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockMission': {
            const b = block as BlockMission;
            return (
              <section key={idx} className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                  {b.title && (
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                      {b.title}
                    </h2>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Mission */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg">
                      {b.missionTitle && (
                        <h3 className="text-3xl font-bold text-green-700 mb-4">
                          {b.missionTitle}
                        </h3>
                      )}
                      {b.missionBody && (
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {b.missionBody}
                        </p>
                      )}
                    </div>

                    {/* Vision */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg">
                      {b.visionTitle && (
                        <h3 className="text-3xl font-bold text-purple-700 mb-4">
                          {b.visionTitle}
                        </h3>
                      )}
                      {b.visionBody && (
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {b.visionBody}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Images */}
                  {b.images && b.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {b.images.map((img, i) => (
                        <div key={i} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                          {img.asset?.url && (
                            <img 
                              src={img.asset.url} 
                              alt="" 
                              className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}