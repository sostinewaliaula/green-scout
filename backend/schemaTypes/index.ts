import page from './page';
import blockText from './blockText';
import blockImage from './blockImage';
import blockGallery from './blockGallery';
import blockStats from './blockStats';
import blockTestimonials from './blockTestimonials';
import blockAbout from './blockAbout';
import blockMission from './blockMission';
import blockProjects from './blockProjects';
import blockNews from './blockNews';
import blockCta from './blockCta';
import blockScoutHero from './blockScoutHero';
import blockScoutOfMonth from './blockScoutOfMonth';
import blockScoutProgram from './blockScoutProgram';
import blockScoutActivities from './blockScoutActivities';
import blockScoutTestimonials from './blockScoutTestimonials';
import blockJoinScout from './blockJoinScout';
import blockTreeOfMonth from './blockTreeOfMonth';
import blockNamedTrees from './blockNamedTrees';
import blockImpactMap from './blockImpactMap';
import blockImpactHero from './blockImpactHero';
import blockObjectives from './blockObjectives';
import blockImpactNumbers from './blockImpactNumbers';
import blockImpactTimeline from './blockImpactTimeline';
import blockImpactStories from './blockImpactStories';
import blockImpactCta from './blockImpactCta';
import blockGalleryHero from './blockGalleryHero';
import galleryImage from './galleryImage';
import navigation from './navigation';
import project from './project';
import newsArticle from './newsArticle';
import namedTree from './namedTree';
import footerSettings from './footerSettings';
import navbarSettings from './navbarSettings';

export const schemaTypes = [
  // Singleton documents
  navbarSettings,
  footerSettings,
  
  // Regular documents
  page,
  project,
  newsArticle,
  namedTree,
  
  // Block types
  blockText,
  blockImage,
  blockGallery,
  blockStats,
  blockTestimonials,
  blockAbout,
  blockMission,
  blockProjects,
  blockNews,
  blockCta,
  blockScoutHero,
  blockScoutOfMonth,
  blockScoutProgram,
  blockScoutActivities,
  blockScoutTestimonials,
  blockJoinScout,
  blockTreeOfMonth,
  blockNamedTrees,
  blockImpactMap,
  blockImpactHero,
  blockObjectives,
  blockImpactNumbers,
  blockImpactTimeline,
  blockImpactStories,
  blockImpactCta,
  blockGalleryHero,
  
  // Other types
  galleryImage,
  navigation
];
