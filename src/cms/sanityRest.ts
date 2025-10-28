import { sanityConfig } from './sanity.config.js';

export type SanityResult<T> = { result: T };

export async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  const { projectId, dataset, apiVersion, token } = sanityConfig;
  const search = new URLSearchParams({ query });
  // Add each parameter with $ prefix
  if (params && Object.keys(params).length) {
    Object.entries(params).forEach(([key, value]) => {
      search.set(`$${key}`, JSON.stringify(value));
    });
  }
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${search.toString()}`;

  try {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    if (!res.ok) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn('[Sanity] Request failed', res.status, await res.text());
      }
      return null;
    }
    const data: SanityResult<T> = await res.json();
    // @ts-ignore
    return data.result ?? null;
  } catch (e) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('[Sanity] Request error', e);
    }
    return null;
  }
}