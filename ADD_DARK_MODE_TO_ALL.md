# Quick Dark Mode Update Guide

Since manually updating each component would take too long, here's a **quick reference** for adding dark mode to any component:

## 🎨 Quick Find & Replace Patterns

### Backgrounds
```
bg-white               → bg-white dark:bg-gray-900
bg-gray-50             → bg-gray-50 dark:bg-gray-800
bg-green-50            → bg-green-50 dark:bg-gray-800
bg-purple-50           → bg-purple-50 dark:bg-gray-800
bg-green-100           → bg-green-100 dark:bg-green-900/30
bg-purple-100          → bg-purple-100 dark:bg-purple-900/30
bg-green-200           → bg-green-200 dark:bg-green-900/40
bg-purple-200          → bg-purple-200 dark:bg-purple-900/40
```

### Text Colors
```
text-gray-900          → text-gray-900 dark:text-white
text-gray-800          → text-gray-800 dark:text-gray-100
text-gray-700          → text-gray-700 dark:text-gray-300
text-gray-600          → text-gray-600 dark:text-gray-400
text-green-800         → text-green-800 dark:text-green-400
text-green-700         → text-green-700 dark:text-green-400
text-purple-800        → text-purple-800 dark:text-purple-400
text-purple-700        → text-purple-700 dark:text-purple-400
```

### Borders & Shadows
```
border-gray-200        → border-gray-200 dark:border-gray-700
shadow-md              → shadow-md dark:shadow-gray-900/50
shadow-lg              → shadow-lg dark:shadow-gray-900
shadow-xl              → shadow-xl dark:shadow-2xl dark:shadow-gray-900
```

### Gradients
```
from-green-50 to-purple-50        → from-green-50 to-purple-50 dark:from-gray-900 dark:to-gray-800
from-white to-green-100           → from-white to-green-100 dark:from-gray-900 dark:to-gray-800
bg-gradient-to-r from-green-50    → bg-gradient-to-r from-green-50 dark:from-gray-900
```

## 📝 Components That Need Updates

Run find & replace on these files using the patterns above:

1. **Home Page Sections**
   - `src/components/HighlightsSection.tsx`
   - `src/components/ImpactStatsSection.tsx`
   - `src/components/FeaturedProjectsSection.tsx`
   - `src/components/TestimonialsSection.tsx`
   - `src/components/NewsPreviewSection.tsx`
   - `src/components/CallToActionSection.tsx`
   - `src/components/HeroCarouselCms.tsx`

2. **Other Pages**
   - `src/pages/ScoutsPage.tsx`
   - `src/pages/TreesPage.tsx`
   - `src/pages/ImpactPage.tsx`
   - `src/pages/GalleryPage.tsx`
   - `src/pages/NewsListPage.tsx`
   - `src/pages/NewsDetailPage.tsx`
   - `src/pages/ProjectDetailPage.tsx`

3. **CMS Components**
   - All files in `src/components/*Cms.tsx`

## 🚀 Already Updated
✅ NavBarCms.tsx
✅ FooterCms.tsx
✅ GetInvolvedSectionCms.tsx
✅ Layout.tsx
✅ AboutSection.tsx
✅ MissionSection.tsx
✅ DarkModeToggle.tsx

## ⚡ Automated Script (Optional)

You can use VS Code's find & replace with regex enabled across all files in `src/` folder.

