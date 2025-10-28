import React, { useState } from 'react';

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

type Project = {
  _id: string;
  title: string;
  location: string;
  image?: ImageAsset;
  description: string;
  treesPlanted: number;
  schoolsInvolved: number;
};

type BlockProjects = {
  _type: 'blockProjects';
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  projects?: Project[];
};

type TestimonialItem = {
  quote: string;
  name: string;
  title: string;
  image?: ImageAsset;
};

type BlockTestimonials = {
  _type: 'blockTestimonials';
  title?: string;
  testimonials?: TestimonialItem[];
};

type NewsArticle = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: ImageAsset;
  excerpt: string;
};

type BlockNews = {
  _type: 'blockNews';
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  articles?: NewsArticle[];
};

type Button = {
  text?: string;
  link?: string;
};

type Audience = {
  title: string;
  description: string;
};

type BlockCta = {
  _type: 'blockCta';
  title?: string;
  subtitle?: string;
  primaryButton?: Button;
  secondaryButton?: Button;
  audiences?: Audience[];
};

type Stat = {
  value: string;
  label: string;
};

type BlockScoutHero = {
  _type: 'blockScoutHero';
  heading?: string;
  subtitle?: string;
  backgroundImage?: ImageAsset;
  stats?: Stat[];
};

type BlockScoutOfMonth = {
  _type: 'blockScoutOfMonth';
  title?: string;
  month?: string;
  scoutName?: string;
  school?: string;
  image?: ImageAsset;
  description?: string;
  achievements?: string[];
  quote?: string;
};

type ProgramLevel = {
  name: string;
  icon?: string;
  color: 'green' | 'purple';
  description: string;
  requirements?: string[];
};

type BlockScoutProgram = {
  _type: 'blockScoutProgram';
  title?: string;
  subtitle?: string;
  levels?: ProgramLevel[];
};

type Activity = {
  title: string;
  image?: ImageAsset;
  description: string;
  frequency: string;
  participants: string;
  locations: string;
};

type Achievement = {
  value: string;
  description: string;
  color?: 'green' | 'purple';
};

type BlockScoutActivities = {
  _type: 'blockScoutActivities';
  title?: string;
  subtitle?: string;
  activities?: Activity[];
  achievements?: Achievement[];
};

type ScoutTestimonial = {
  quote: string;
  scoutName: string;
  scoutLevel?: string;
  age?: number;
  school?: string;
  image?: ImageAsset;
};

type LeaderQuote = {
  quote: string;
  name: string;
  title: string;
};

type BlockScoutTestimonials = {
  _type: 'blockScoutTestimonials';
  title?: string;
  subtitle?: string;
  testimonials?: ScoutTestimonial[];
  leaderQuote?: LeaderQuote;
};

type JoinStep = {
  title: string;
  description: string;
};

type ApplyButton = {
  text?: string;
  link?: string;
};

type OrganizationsBox = {
  enabled?: boolean;
  heading?: string;
  description?: string;
  linkText?: string;
  linkUrl?: string;
};

type BlockJoinScout = {
  _type: 'blockJoinScout';
  title?: string;
  description?: string;
  benefitsHeading?: string;
  benefits?: string[];
  applyButton?: ApplyButton;
  stepsHeading?: string;
  steps?: JoinStep[];
  organizationsBox?: OrganizationsBox;
};

type BlockTreeOfMonth = {
  _type: 'blockTreeOfMonth';
  title?: string;
  month?: string;
  treeName?: string;
  scientificName?: string;
  location?: string;
  plantedDate?: string;
  image?: ImageAsset;
  description?: any[];
  whyItMatters?: string;
};

type NamedTreeItem = {
  _id: string;
  treeName: string;
  namedAfter: string;
  role: string;
  image?: ImageAsset;
  slug?: { current: string };
};

type BlockNamedTrees = {
  _type: 'blockNamedTrees';
  title?: string;
  subtitle?: string;
  displayMode?: 'selected' | 'all' | 'featured';
  selectedTrees?: NamedTreeItem[];
  maxTreesToShow?: number;
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  viewAllButtonLink?: string;
};

type MapCoordinates = {
  lat: number;
  lng: number;
};

type MapLocation = {
  name: string;
  treeName: string;
  description?: string;
  coordinates: MapCoordinates;
  treesPlanted?: number;
  plantedDate?: string;
  image?: ImageAsset;
  detailsLink?: string;
};

type BlockImpactMap = {
  _type: 'blockImpactMap';
  title?: string;
  subtitle?: string;
  locations?: MapLocation[];
  defaultCenter?: MapCoordinates;
  defaultZoom?: number;
};

type BlockImpactHero = {
  _type: 'blockImpactHero';
  title?: string;
  subtitle?: string;
  backgroundImage?: ImageAsset;
  overlayOpacity?: number;
};

type ObjectiveItem = {
  icon: string;
  title: string;
  description: string;
  colorTheme?: 'green' | 'purple';
};

type BlockObjectives = {
  _type: 'blockObjectives';
  title?: string;
  objectives?: ObjectiveItem[];
};

type ImpactStat = {
  value: string;
  label: string;
  colorTheme?: 'green' | 'purple';
};

type BlockImpactNumbers = {
  _type: 'blockImpactNumbers';
  title?: string;
  stats?: ImpactStat[];
};

type TimelineStep = {
  stepNumber: number;
  title: string;
  description: string;
  colorTheme?: 'green' | 'purple';
};

type BlockImpactTimeline = {
  _type: 'blockImpactTimeline';
  title?: string;
  steps?: TimelineStep[];
};

type ImpactStory = {
  quote: string;
  authorName: string;
  authorRole: string;
  location: string;
  colorTheme?: 'green' | 'purple';
};

type BlockImpactStories = {
  _type: 'blockImpactStories';
  title?: string;
  stories?: ImpactStory[];
};

export type CmsBlock = BlockText | BlockImage | BlockGallery | BlockStats | BlockAbout | BlockMission | BlockProjects | BlockTestimonials | BlockNews | BlockCta | BlockScoutHero | BlockScoutOfMonth | BlockScoutProgram | BlockScoutActivities | BlockScoutTestimonials | BlockJoinScout | BlockTreeOfMonth | BlockNamedTrees | BlockImpactMap | BlockImpactHero | BlockObjectives | BlockImpactNumbers | BlockImpactTimeline | BlockImpactStories;

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
          case 'blockTestimonials': {
            const b = block as BlockTestimonials;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [currentIndex, setCurrentIndex] = useState(0);
            
            if (!b.testimonials || b.testimonials.length === 0) return null;
            
            const currentTestimonial = b.testimonials[currentIndex];
            
            const nextTestimonial = () => {
              setCurrentIndex((prev) => (prev === b.testimonials!.length - 1 ? 0 : prev + 1));
            };
            
            const prevTestimonial = () => {
              setCurrentIndex((prev) => (prev === 0 ? b.testimonials!.length - 1 : prev - 1));
            };
            
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-green-50">
                <div className="max-w-6xl mx-auto">
                  {b.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-700">
                      {b.title}
                    </h2>
                  )}
                  <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-10 overflow-hidden">
                    <div className="absolute top-6 left-6 text-green-200">
                      <svg className="w-16 h-16 md:w-24 md:h-24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/4 flex flex-col items-center">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-green-100">
                            {currentTestimonial.image?.asset?.url ? (
                              <img
                                src={currentTestimonial.image.asset.url}
                                alt={currentTestimonial.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                <span className="text-green-600 text-4xl">👤</span>
                              </div>
                            )}
                          </div>
                          <div className="flex mt-6 gap-2">
                            <button
                              onClick={prevTestimonial}
                              className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                              aria-label="Previous testimonial"
                            >
                              <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button
                              onClick={nextTestimonial}
                              className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
                              aria-label="Next testimonial"
                            >
                              <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="md:w-3/4 text-center md:text-left">
                          <p className="text-xl md:text-2xl text-gray-700 italic mb-6">
                            "{currentTestimonial.quote}"
                          </p>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {currentTestimonial.name}
                            </h3>
                            <p className="text-purple-700">{currentTestimonial.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-center gap-2">
                      {b.testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex ? 'bg-green-700 w-6' : 'bg-green-200'
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
          case 'blockProjects': {
            const b = block as BlockProjects;
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      {b.title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
                          {b.title}
                        </h2>
                      )}
                      {b.subtitle && (
                        <p className="text-lg text-gray-700 max-w-2xl">
                          {b.subtitle}
                        </p>
                      )}
                    </div>
                    {b.showViewAllLink && (
                      <a
                        href="/impact"
                        className="hidden md:flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors"
                      >
                        View all projects
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                  {b.projects && b.projects.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {b.projects.map((project) => (
                        <div
                          key={project._id}
                          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="h-48 overflow-hidden">
                            {project.image?.asset?.url ? (
                              <img
                                src={project.image.asset.url}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                <span className="text-green-600 text-4xl">🌳</span>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-xl font-bold text-gray-900">
                                {project.title}
                              </h3>
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap ml-2">
                                {project.location}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            <div className="flex justify-between pt-4 border-t border-gray-100">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-green-700">
                                  {project.treesPlanted.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">Trees Planted</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-purple-700">
                                  {project.schoolsInvolved}
                                </p>
                                <p className="text-sm text-gray-600">Schools</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {b.showViewAllLink && (
                    <div className="mt-8 text-center md:hidden">
                      <a
                        href="/impact"
                        className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors"
                      >
                        View all projects
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockNews': {
            const b = block as BlockNews;
            const formatDate = (dateString: string) => {
              const date = new Date(dateString);
              return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            };
            
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      {b.title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
                          {b.title}
                        </h2>
                      )}
                      {b.subtitle && (
                        <p className="text-lg text-gray-700 max-w-2xl">
                          {b.subtitle}
                        </p>
                      )}
                    </div>
                    {b.showViewAllLink && (
                      <a
                        href="/news"
                        className="hidden md:flex items-center text-green-700 font-medium hover:text-green-900 transition-colors"
                      >
                        View all news
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                  {b.articles && b.articles.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {b.articles.map((article) => (
                        <article
                          key={article._id}
                          className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="h-48 overflow-hidden">
                            {article.image?.asset?.url ? (
                              <img
                                src={article.image.asset.url}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                                <span className="text-purple-600 text-4xl">📰</span>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="flex items-center text-gray-500 mb-3">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm">{formatDate(article.publishedAt)}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                              {article.title}
                            </h3>
                            <p className="text-gray-700 mb-4">{article.excerpt}</p>
                            <a
                              href={`/news/${article.slug.current}`}
                              className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors"
                            >
                              Read more
                              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                  {b.showViewAllLink && (
                    <div className="mt-8 text-center md:hidden">
                      <a
                        href="/news"
                        className="inline-flex items-center text-green-700 font-medium hover:text-green-900 transition-colors"
                      >
                        View all news
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockScoutHero': {
            const b = block as BlockScoutHero;
            const backgroundImage = b.backgroundImage?.asset?.url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';
            
            return (
              <section key={idx} className="relative w-full h-[60vh] overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img
                    src={backgroundImage}
                    alt="Green Scouts in action"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-purple-900/70" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                  {b.heading && (
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                      {b.heading.split(' ').map((word, i) => {
                        if (word.toLowerCase() === 'green') {
                          return <span key={i} className="text-green-400">{word} </span>;
                        } else if (word.toLowerCase() === 'scouts') {
                          return <span key={i} className="text-purple-400">{word} </span>;
                        }
                        return word + ' ';
                      })}
                    </h1>
                  )}
                  {b.subtitle && (
                    <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
                      {b.subtitle}
                    </p>
                  )}
                  {b.stats && b.stats.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                      {b.stats.map((stat, i) => (
                        <div key={i} className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                          <p className="text-3xl font-bold text-white">{stat.value}</p>
                          <p className="text-sm text-green-200">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockScoutOfMonth': {
            const b = block as BlockScoutOfMonth;
            return (
              <section key={idx} id="scouts" className="py-20 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                  {b.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">
                      {b.title}
                    </h2>
                  )}
                  <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/5 overflow-hidden">
                        {b.image?.asset?.url ? (
                          <img
                            src={b.image.asset.url}
                            alt={`${b.scoutName} - Scout of the Month`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-200 to-purple-200 flex items-center justify-center">
                            <span className="text-6xl">👤</span>
                          </div>
                        )}
                      </div>
                      <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                        {b.month && (
                          <div className="inline-block px-4 py-1 rounded-full bg-purple-200 text-purple-800 font-medium text-sm mb-4 self-start">
                            {b.month}
                          </div>
                        )}
                        {b.scoutName && (
                          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                            {b.scoutName}
                          </h3>
                        )}
                        {b.school && (
                          <p className="text-lg text-green-800 font-medium mb-4">
                            {b.school}
                          </p>
                        )}
                        {b.description && (
                          <p className="text-gray-700 mb-6">{b.description}</p>
                        )}
                        {b.achievements && b.achievements.length > 0 && (
                          <div className="space-y-2 mb-6">
                            {b.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                <span className="text-gray-700">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {b.quote && (
                          <blockquote className="mt-6 italic text-gray-600 border-l-4 border-purple-500 pl-4">
                            "{b.quote}"
                          </blockquote>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }
          case 'blockScoutProgram': {
            const b = block as BlockScoutProgram;
            
            const getIconSvg = (iconName?: string, color?: 'green' | 'purple') => {
              const iconClass = color === 'purple' ? 'text-purple-700' : 'text-green-600';
              
              switch (iconName) {
                case 'shield':
                  return (
                    <svg className={`w-8 h-8 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  );
                case 'tree':
                  return (
                    <svg className={`w-8 h-8 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L9 8h2v6H9l-3 6h12l-3-6h-2V8h2z" />
                    </svg>
                  );
                case 'sprout':
                  return (
                    <svg className={`w-8 h-8 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20V10M12 10C10.8 8.8 8 7 5 7c0 3 2 5 4 6m3-3c1.2-1.2 4-3 7-3 0 3-2 5-4 6" />
                    </svg>
                  );
                default: // leaf
                  return (
                    <svg className={`w-8 h-8 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  );
              }
            };
            
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-green-50">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    {b.title && (
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
                        {b.title}
                      </h2>
                    )}
                    {b.subtitle && (
                      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        {b.subtitle}
                      </p>
                    )}
                  </div>
                  {b.levels && b.levels.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {b.levels.map((level, i) => (
                        <div
                          key={i}
                          className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 ${
                            level.color === 'green' ? 'border-green-600' : 'border-purple-600'
                          }`}
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-lg ${level.color === 'green' ? 'bg-green-100' : 'bg-purple-100'}`}>
                                {getIconSvg(level.icon, level.color)}
                              </div>
                              <div>
                                <h3 className={`text-xl font-bold mb-2 ${level.color === 'green' ? 'text-green-700' : 'text-purple-700'}`}>
                                  {level.name}
                                </h3>
                                <p className="text-gray-700 mb-4">{level.description}</p>
                              </div>
                            </div>
                            {level.requirements && level.requirements.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                                <ul className="space-y-2">
                                  {level.requirements.map((req, reqIdx) => (
                                    <li key={reqIdx} className="flex items-start gap-2">
                                      <div className={`w-2 h-2 rounded-full mt-2 ${level.color === 'green' ? 'bg-green-600' : 'bg-purple-600'}`}></div>
                                      <span className="text-gray-700">{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockScoutActivities': {
            const b = block as BlockScoutActivities;
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-16">
                    {b.title && (
                      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-700">
                        {b.title}
                      </h2>
                    )}
                    {b.subtitle && (
                      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        {b.subtitle}
                      </p>
                    )}
                  </div>
                  
                  {/* Activities Grid */}
                  {b.activities && b.activities.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {b.activities.map((activity, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                          <div className="h-56 overflow-hidden">
                            {activity.image?.asset?.url ? (
                              <img src={activity.image.asset.url} alt={activity.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-green-100 to-purple-100 flex items-center justify-center">
                                <span className="text-6xl">🌳</span>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                            <p className="text-gray-700 mb-4">{activity.description}</p>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                                <svg className="w-5 h-5 text-green-700 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium text-gray-900">Frequency</span>
                                <span className="text-gray-600">{activity.frequency}</span>
                              </div>
                              <div className="flex flex-col items-center p-2 bg-purple-50 rounded-lg">
                                <svg className="w-5 h-5 text-purple-700 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span className="font-medium text-gray-900">Participants</span>
                                <span className="text-gray-600">{activity.participants}</span>
                              </div>
                              <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg">
                                <svg className="w-5 h-5 text-green-700 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="font-medium text-gray-900">Location</span>
                                <span className="text-gray-600">{activity.locations}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Achievements */}
                  {b.achievements && b.achievements.length > 0 && (
                    <div className="mt-16 bg-gradient-to-r from-green-100 to-purple-100 rounded-xl p-8">
                      <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Key Achievements</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {b.achievements.map((achievement, i) => (
                          <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                            <div className={`text-4xl font-bold mb-2 ${achievement.color === 'purple' ? 'text-purple-700' : 'text-green-700'}`}>
                              {achievement.value}
                            </div>
                            <p className="text-gray-700">{achievement.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockCta': {
            const b = block as BlockCta;
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-600 to-purple-600 text-white">
                <div className="max-w-6xl mx-auto text-center">
                  {b.title && (
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      {b.title}
                    </h2>
                  )}
                  {b.subtitle && (
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-green-50">
                      {b.subtitle}
                    </p>
                  )}
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    {b.primaryButton?.text && (
                      <a
                        href={b.primaryButton.link || '/get-involved'}
                        className="px-8 py-3 bg-white text-purple-700 rounded-full font-medium hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
                      >
                        {b.primaryButton.text}
                      </a>
                    )}
                    {b.secondaryButton?.text && (
                      <a
                        href={b.secondaryButton.link || '/get-involved'}
                        className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all transform hover:scale-105"
                      >
                        {b.secondaryButton.text}
                      </a>
                    )}
                  </div>
                  {b.audiences && b.audiences.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-8">
                      {b.audiences.map((audience, i) => (
                        <div key={i} className="flex flex-col items-center">
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
          case 'blockScoutTestimonials': {
            const b = block as BlockScoutTestimonials;
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-green-50">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    {b.title && (
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
                        {b.title}
                      </h2>
                    )}
                    {b.subtitle && (
                      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        {b.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {b.testimonials?.map((testimonial, i) => (
                      <div
                        key={i}
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

                  {b.leaderQuote && (
                    <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                      <p className="text-lg italic text-gray-700 mb-4">
                        "{b.leaderQuote.quote}"
                      </p>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          — {b.leaderQuote.name}
                        </p>
                        <p className="text-sm text-purple-700">
                          {b.leaderQuote.title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockJoinScout': {
            const b = block as BlockJoinScout;
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-gradient-to-br from-purple-50 via-white to-green-50">
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Main Info */}
                    <div>
                      {b.title && (
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                          {b.title}
                        </h2>
                      )}
                      
                      {b.description && (
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                          {b.description}
                        </p>
                      )}

                      {b.benefits && b.benefits.length > 0 && (
                        <div className="mb-8">
                          {b.benefitsHeading && (
                            <h3 className="text-xl font-bold mb-4 text-green-800">
                              {b.benefitsHeading}
                            </h3>
                          )}
                          <ul className="space-y-3">
                            {b.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                  <svg className="w-3 h-3 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {b.applyButton?.text && (
                        <a
                          href={b.applyButton.link || '/get-involved'}
                          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white rounded-full font-medium hover:from-green-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                        >
                          {b.applyButton.text}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {/* Right Column - Steps & Organizations */}
                    <div className="space-y-6">
                      {/* Steps */}
                      {b.steps && b.steps.length > 0 && (
                        <div className="bg-white rounded-xl shadow-md p-8">
                          {b.stepsHeading && (
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">
                              {b.stepsHeading}
                            </h3>
                          )}
                          <div className="space-y-6">
                            {b.steps.map((step, i) => (
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
                      {b.organizationsBox?.enabled && (
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6">
                          {b.organizationsBox.heading && (
                            <h3 className="text-xl font-bold mb-3 text-gray-900">
                              {b.organizationsBox.heading}
                            </h3>
                          )}
                          {b.organizationsBox.description && (
                            <p className="text-gray-700 mb-4">
                              {b.organizationsBox.description}
                            </p>
                          )}
                          {b.organizationsBox.linkText && (
                            <a
                              href={b.organizationsBox.linkUrl || '/get-involved'}
                              className="inline-flex items-center gap-2 text-purple-700 font-medium hover:text-purple-900 transition-colors"
                            >
                              {b.organizationsBox.linkText}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          }
          case 'blockTreeOfMonth': {
            const b = block as BlockTreeOfMonth;
            
            // Simple block content to text converter
            const blockContentToText = (blocks: any[]): string[] => {
              if (!blocks) return [];
              return blocks
                .filter((block) => block._type === 'block')
                .map((block) => {
                  return block.children
                    ?.map((child: any) => child.text)
                    .join('') || '';
                })
                .filter((text) => text.length > 0);
            };

            const formatDate = (dateString?: string) => {
              if (!dateString) return '';
              const date = new Date(dateString);
              return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            };

            const descriptionParagraphs = blockContentToText(b.description || []);

            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-gradient-to-br from-green-50 to-green-100">
                <div className="max-w-6xl mx-auto">
                  {b.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
                      {b.title}
                    </h2>
                  )}

                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Left Column - Tree Details */}
                      <div className="p-8 md:p-12">
                        {b.month && (
                          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                            {b.month}
                          </div>
                        )}

                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                          {b.treeName}
                          {b.scientificName && (
                            <span className="block text-xl md:text-2xl text-gray-600 font-normal italic mt-2">
                              ({b.scientificName})
                            </span>
                          )}
                        </h3>

                        <div className="flex flex-col gap-3 mb-6 text-gray-700">
                          {b.location && (
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{b.location}</span>
                            </div>
                          )}
                          {b.plantedDate && (
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Planted: {formatDate(b.plantedDate)}</span>
                            </div>
                          )}
                        </div>

                        {descriptionParagraphs.length > 0 && (
                          <div className="space-y-4 mb-6">
                            {descriptionParagraphs.map((paragraph, i) => (
                              <p key={i} className="text-gray-700 leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}

                        {b.whyItMatters && (
                          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                            <h4 className="text-lg font-bold text-green-800 mb-3">
                              Why It Matters
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                              {b.whyItMatters}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Tree Image */}
                      <div className="h-full min-h-[400px] lg:min-h-[600px]">
                        {b.image?.asset?.url ? (
                          <img
                            src={b.image.asset.url}
                            alt={b.treeName || 'Tree of the Month'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
                            <span className="text-8xl">🌳</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          }
          case 'blockNamedTrees': {
            const b = block as BlockNamedTrees;
            
            // Note: For CmsRenderer, we can only show selected trees since we don't have 
            // the ability to fetch additional data here. For full functionality,
            // use the dedicated NamedTreesSectionCms component.
            const trees = b.selectedTrees || [];

            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-purple-50">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    {b.title && (
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
                        {b.title}
                      </h2>
                    )}
                    {b.subtitle && (
                      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        {b.subtitle}
                      </p>
                    )}
                  </div>

                  {trees.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                        {trees.map((tree) => (
                          <div
                            key={tree._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                          >
                            <div className="h-48 overflow-hidden">
                              {tree.image?.asset?.url ? (
                                <img
                                  src={tree.image.asset.url}
                                  alt={tree.treeName}
                                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                                  <span className="text-5xl">🌳</span>
                                </div>
                              )}
                            </div>
                            <div className="p-5">
                              <h3 className="text-lg font-bold text-green-700 mb-2">
                                {tree.treeName}
                              </h3>
                              <p className="text-sm text-purple-700 mb-1">
                                Named after: {tree.namedAfter}
                              </p>
                              <p className="text-xs text-gray-600">
                                {tree.role}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {b.showViewAllButton && (
                        <div className="text-center">
                          <a
                            href={b.viewAllButtonLink || '/named-trees'}
                            className="inline-block px-8 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white rounded-full font-medium hover:from-green-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                          >
                            {b.viewAllButtonText || 'View All Named Trees'}
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-gray-600">
                      No trees configured. Please select trees in Sanity Studio.
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockImpactMap': {
            const b = block as BlockImpactMap;
            
            // Note: For full interactive map functionality, use the dedicated ImpactMapSectionCms component.
            // This renders a simplified list view of locations.
            
            return (
              <section key={idx} className="py-20 px-4 md:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    {b.title && (
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-700">
                        {b.title}
                      </h2>
                    )}
                    {b.subtitle && (
                      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        {b.subtitle}
                      </p>
                    )}
                  </div>

                  {b.locations && b.locations.length > 0 ? (
                    <div className="bg-purple-50 rounded-xl p-8 border-2 border-purple-200">
                      <p className="text-center text-gray-600 mb-6">
                        📍 Interactive map with {b.locations.length} planting locations
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {b.locations.map((location, i) => (
                          <div key={i} className="bg-white rounded-lg p-4 shadow-md">
                            {location.image?.asset?.url && (
                              <img
                                src={location.image.asset.url}
                                alt={location.treeName}
                                className="w-full h-32 object-cover rounded mb-3"
                              />
                            )}
                            <h3 className="font-bold text-green-700 mb-1">
                              {location.treeName}
                            </h3>
                            <p className="text-sm font-medium text-gray-900 mb-2">
                              {location.name}
                            </p>
                            {location.description && (
                              <p className="text-sm text-gray-700 mb-2">
                                {location.description}
                              </p>
                            )}
                            {location.treesPlanted && (
                              <p className="text-sm text-purple-700">
                                🌳 {location.treesPlanted} trees planted
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-sm text-gray-500 mt-6">
                        Note: Use the dedicated ImpactMapSectionCms component for full interactive map experience.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      No locations configured. Please add locations in Sanity Studio.
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockImpactHero': {
            const b = block as BlockImpactHero;
            const overlayOpacity = b.overlayOpacity || 50;
            const backgroundImage = b.backgroundImage?.asset?.url || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80';

            return (
              <section key={idx} className="relative w-full h-[50vh] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={backgroundImage}
                    alt="Impact Hero"
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"
                    style={{ opacity: overlayOpacity / 100 }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
                  {b.title && (
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
                      {b.title.split(' ').map((word, i) => {
                        if (word.toLowerCase() === 'greenscout') {
                          return (
                            <span key={i}>
                              <span className="text-green-400">Green</span>
                              <span className="text-white">Scout</span>{' '}
                            </span>
                          );
                        }
                        return word + ' ';
                      })}
                    </h1>
                  )}
                  {b.subtitle && (
                    <p className="text-xl md:text-2xl text-green-100 max-w-3xl leading-relaxed">
                      {b.subtitle}
                    </p>
                  )}
                </div>
              </section>
            );
          }
          case 'blockObjectives': {
            const b = block as BlockObjectives;
            
            return (
              <section key={idx} className="py-16 px-4 md:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                  {b.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-purple-700">
                      {b.title}
                    </h2>
                  )}
                  {b.objectives && b.objectives.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {b.objectives.map((objective, i) => {
                        const isGreen = objective.colorTheme === 'green';
                        const bgColor = isGreen ? 'bg-green-50' : 'bg-purple-50';
                        const titleColor = isGreen ? 'text-green-700' : 'text-purple-700';

                        return (
                          <div
                            key={i}
                            className={`${bgColor} rounded-xl p-6 flex flex-col items-center shadow hover:shadow-lg transition-shadow text-center`}
                          >
                            <span className="text-4xl mb-3" role="img" aria-label={objective.title}>
                              {objective.icon}
                            </span>
                            <h3 className={`font-bold text-lg mb-2 ${titleColor}`}>
                              {objective.title}
                            </h3>
                            <p className="text-gray-700">
                              {objective.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      No objectives configured.
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockImpactNumbers': {
            const b = block as BlockImpactNumbers;
            
            return (
              <section key={idx} className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-50 to-purple-50">
                <div className="max-w-5xl mx-auto">
                  {b.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-700">
                      {b.title}
                    </h2>
                  )}
                  {b.stats && b.stats.length > 0 ? (
                    <div className={`grid grid-cols-2 md:grid-cols-${Math.min(b.stats.length, 4)} gap-8 text-center`}>
                      {b.stats.map((stat, i) => {
                        const isGreen = stat.colorTheme === 'green';
                        const textColor = isGreen ? 'text-green-700' : 'text-purple-700';

                        return (
                          <div key={i}>
                            <div className={`text-5xl font-bold ${textColor} mb-2`}>
                              {stat.value}
                            </div>
                            <div className="text-gray-700">
                              {stat.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      No impact statistics configured.
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockImpactTimeline': {
            const b = block as BlockImpactTimeline;
            const sortedSteps = b.steps ? [...b.steps].sort((a, b) => a.stepNumber - b.stepNumber) : [];
            
            return (
              <section key={idx} className="py-16 px-4 md:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                  {b.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-purple-700">
                      {b.title}
                    </h2>
                  )}
                  {sortedSteps.length > 0 ? (
                    <div className="space-y-8">
                      {sortedSteps.map((step, i) => {
                        const isGreen = step.colorTheme === 'green';
                        const bgColor = isGreen ? 'bg-green-500' : 'bg-purple-500';
                        const textColor = isGreen ? 'text-green-700' : 'text-purple-700';
                        const isLastStep = i === sortedSteps.length - 1;

                        return (
                          <div key={i} className="flex gap-6">
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
                              <p className="text-gray-700">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      No timeline steps configured.
                    </div>
                  )}
                </div>
              </section>
            );
          }
          case 'blockImpactStories': {
            const b = block as BlockImpactStories;
            
            return (
              <section key={idx} className="py-16 px-4 md:px-8 bg-gradient-to-r from-green-100 to-purple-100">
                <div className="max-w-4xl mx-auto">
                  {b.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-800">
                      {b.title}
                    </h2>
                  )}
                  {b.stories && b.stories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {b.stories.map((story, i) => {
                        const isGreen = story.colorTheme === 'green';
                        const authorColor = isGreen ? 'text-green-700' : 'text-purple-700';

                        return (
                          <div key={i} className="bg-white rounded-xl p-6 shadow flex flex-col">
                            <p className="text-gray-700 mb-4">
                              "{story.quote}"
                            </p>
                            <div className={`font-bold ${authorColor}`}>
                              — {story.authorName}, {story.authorRole}, {story.location}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      No stories configured.
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