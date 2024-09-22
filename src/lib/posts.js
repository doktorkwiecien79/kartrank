/*
import postsData from '../data/posts.json';

export function getPostContent(slug) {
  return postsData[slug];
}

export function getAllPostSlugs() {
  return Object.keys(postsData).map(slug => {
    return {
      params: {
        post: slug,
      },
    };
  });
}*/

// This function dynamically imports the data based on the post type
async function importPostsData(postType) {
  if (postType === 'tracks') {
    return (await import('../data/posts.json')).default;
  } else if (postType === 'races') {
    return (await import('../data/raceposts.json')).default;
  } else {
    throw new Error(`Unknown post type: ${postType}`);
  }
}

// Get the content of a single post based on its slug and the type
export async function getPostContent(slug, postType) {
  const postsData = await importPostsData(postType);
  return postsData[slug];
}

export async function getAllPostSlugs(postType) {
  const postsData = await importPostsData(postType);
  return Object.keys(postsData);  // Directly return an array of slug strings
}

