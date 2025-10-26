import React, { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';
import { CmsRenderer, CmsBlock } from '../components/CmsRenderer';
import { useParams } from 'react-router-dom';

interface CmsPageDoc {
  _id: string;
  title?: string;
  slug?: { current?: string };
  content?: CmsBlock[];
}

export function CmsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<CmsPageDoc | null>(null);

  useEffect(() => {
    if (!slug) return;
    sanityClient
      .fetch(
        `*[_type == "page" && slug.current == $slug][0]{
          _id, title, slug, content[]{
            _type,
            _key,
            ...,
            images[]{asset->{url}},
            image{asset->{url}},
            stats[]{label, value, sublabel, theme, icon},
            intro,
            projects[]->{
              _id,
              title,
              location,
              image{asset->{url}},
              description,
              treesPlanted,
              schoolsInvolved
            },
            testimonials[]{
              quote,
              name,
              title,
              image{asset->{url}}
            },
            asset->{url}
          }
        }`,
        { slug }
      )
      .then((data) => setPage(data));
  }, [slug]);

  if (!page) return <div className="pt-16 px-4">Loading...</div>;

  return (
    <div className="pt-16">
      {page.title && (
        <div className="bg-gradient-to-r from-green-600 to-purple-600 text-white py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-center">{page.title}</h1>
        </div>
      )}
      <div className="py-12">
        <CmsRenderer content={page.content || []} />
      </div>
    </div>
  );
}