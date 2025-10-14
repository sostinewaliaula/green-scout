// Central Sanity configuration (frontend)
// Reads from Vite env vars. Create a .env.local with these if needed.
// VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, VITE_SANITY_API_VERSION, VITE_SANITY_READ_TOKEN

export const sanityConfig = {
  projectId: (import.meta && import.meta.env && import.meta.env.VITE_SANITY_PROJECT_ID) || 'cew8k4ec',
  dataset: (import.meta && import.meta.env && import.meta.env.VITE_SANITY_DATASET) || 'production',
  apiVersion: (import.meta && import.meta.env && import.meta.env.VITE_SANITY_API_VERSION) || '2023-01-01',
  // Optional. Only needed if your dataset is private.
  token: (import.meta && import.meta.env && import.meta.env.VITE_SANITY_READ_TOKEN) || '',
  // Use CDN for faster, cached responses in production when you don’t need fresh data.
  useCdn: true,
};