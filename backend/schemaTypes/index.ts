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
import galleryImage from './galleryImage';
import navigation from './navigation';
import project from './project';
import newsArticle from './newsArticle';
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
  
  // Other types
  galleryImage,
  navigation
];
