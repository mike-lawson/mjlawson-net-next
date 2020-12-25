import PostPreview from '@/components/PostPreview';
import getPosts from '@/getPostPreviews';

const posts = getPosts();

export default function IndexPage() {
  return (
    <>
      {posts.map((post) => (
        <PostPreview key={post.module.meta.title} post={post} />
      ))}
    </>
  );
}
