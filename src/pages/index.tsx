import Head from 'next/head';
import PostPreview from '@/components/PostPreview';
import getPosts from '@/getPostPreviews';

const posts = getPosts();

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Mike Lawson - Thoughts, critiques, and tutorials</title>
        <meta
          name="description"
          content="Yet Another Blog that delves into React, JavaScript, TypeScript, and more."
        />
      </Head>
      {posts.map((post) => (
        <PostPreview key={post.module.meta.title} post={post} />
      ))}
    </>
  );
}
