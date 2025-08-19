import { createDirectus, graphql } from '@directus/sdk';
import { dev } from 'astro';

type Article = {
  id: string;
  date_created: string;
  date_updated: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  feature_image?: { id: string };
  body: string;
  tags?: string[];
};

const directus = createDirectus('https://directus.katharostech.com').with(graphql());

export default directus;

export async function getArticles() {
  const { devoptimus_posts } = await directus.query<{ devoptimus_posts: Article[] }>(
    `query {
      devoptimus_posts {
        id
        date_created
        date_updated
        title
        slug
        excerpt
        category
        feature_image {
          id
        }
        body
        tags
      }
    }`
  );
  return devoptimus_posts;
}
