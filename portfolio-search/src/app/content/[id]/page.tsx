import type { Metadata } from 'next';
import { existsSync } from 'fs';
import path from 'path';
import { getAllContent, getContentById, getCoverImage } from '../../../utils/contentUtils';
import ContentClient from './ContentClient';

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllContent().map(item => ({ id: item.id }));
}

const summarise = (text: string, max = 160) => {
  const flat = text.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 1).trimEnd()}…` : flat;
};

// Some social sites (e.g. LinkedIn) don't render WebP previews - prefer a .jpg sibling if one exists
const socialImage = (src: string) => {
  if (!src.endsWith('.webp')) return src;
  const jpg = src.replace(/\.webp$/, '.jpg');
  return existsSync(path.join(process.cwd(), 'public', jpg)) ? jpg : src;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const content = getContentById(id);
  if (!content) return { title: 'Not found' };

  const description = summarise(content.detail);
  const coverSrc = getCoverImage(content);
  const cover = coverSrc ? socialImage(coverSrc) : undefined;
  const images = cover ? [{ url: cover, alt: content.title }] : undefined;

  return {
    title: content.title,
    description,
    alternates: { canonical: `/content/${id}` },
    openGraph: { title: content.title, description, type: 'article', url: `/content/${id}`, images },
    twitter: { card: cover ? 'summary_large_image' : 'summary', title: content.title, description, images: cover ? [cover] : undefined },
  };
}

export default async function ContentPageRoute({ params }: Params) {
  const { id } = await params;
  return <ContentClient id={id} />;
}
