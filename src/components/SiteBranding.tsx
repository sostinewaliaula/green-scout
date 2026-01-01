import { useEffect } from 'react';
import sanityClient from '../sanityClient';
import treeIcon from '../assets/tree.png';

export function SiteBranding() {
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const query = `*[_type == "siteSettings"][0]{
          title,
          "faviconUrl": favicon.asset->url
        }`;
                const settings = await sanityClient.fetch(query);

                // Update document title
                if (settings?.title) {
                    document.title = settings.title;
                } else {
                    document.title = 'Green Scout';
                }

                const faviconUrl = settings?.faviconUrl || treeIcon;

                // Update the favicon link tag
                let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");

                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.getElementsByTagName('head')[0].appendChild(link);
                }

                link.href = faviconUrl;
            } catch (error) {
                console.error('Error fetching site settings for favicon:', error);
                // Fallback to local tree icon if query fails
                let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
                if (link) {
                    link.href = treeIcon;
                }
            }
        };

        fetchSettings();
    }, []);

    return null;
}
