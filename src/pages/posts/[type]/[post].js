import React from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import ImageCarousel2 from '../../../components/ImageCarousel2';
import SVP from '../../../components/SimpleVideoPlayer';
import ReactMarkdown from 'react-markdown';
import YouTubeEmbed from '../../../components/YouTube';
import { CommentSection } from '@/components/CommentSection';
import { getPostContent, getAllPostSlugs } from '../../../lib/posts';
import AddComment from '@/components/AddComment';
import { CommentProvider } from '../../../context/CommentContext';
import { useState } from 'react';


const inter = Inter({ subsets: ['latin'] });

const Post = ({ postData }) => {
  const router = useRouter();
  const [pageUrl, setPageUrl] = useState(router.asPath);
  console.log("Post: ", pageUrl);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
  <CommentProvider>
    <main className={inter.className}>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="text-left p-8 flex-grow flex-basis-3/4">
          <p className="font-bold text-black font-sans">{postData.textParts[0]}</p>
        </div>
        <div>
          <ImageCarousel2 images={postData.images} />
        </div>
        {postData.textParts.slice(1).map((text, index) => (
          <div key={index} className="text-left p-4 flex-grow flex-basis-3/4">
            <ReactMarkdown className="text-black">{text}</ReactMarkdown>
          </div>
        ))}
        <div>
          <SVP images={postData.images} />
        </div>
        <div className="w-full">
        {postData.YTlink && postData.YTlink.length > 0 && (
          <div className="w-full">
            <div className='h-4 bg-red-900 w-full'/>
            <YouTubeEmbed id={postData.YTlink[0]} className="w-full"/> 
          </div>
        )}
        </div>
        <div className="w-full px-10 lg:px-20">
          <AddComment parentId={null} pageName={pageUrl} />
        </div>
        <div className="w-full px-10 lg:px-20">
          <CommentSection parent={null} pageName={pageUrl} />
        </div>
      </div>
    </main>
  </CommentProvider>

  );
};

export async function getStaticPaths() {
  // Get paths for 'track' and 'race'
  const trackSlugs = await getAllPostSlugs('tracks');
  const raceSlugs = await getAllPostSlugs('races');

  // Combine paths from both post types

  const paths = [
    ...trackSlugs.map(slug => ({ params: { type: 'tracks', post: slug } })),
    ...raceSlugs.map(slug => ({ params: { type: 'races', post: slug } }))
  ];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { post, type } = params;

  // Fetch post data based on the type and slug
  const postData = await getPostContent(post, type);

  return {
    props: {
      postData,
    },
    revalidate: 60, // In seconds
  };
}

export default Post;
