import Link from 'next/link';
import formatRelative from 'date-fns/formatRelative';
import { Post } from '@/types';

type Props = {
  post: Post;
};

export default function PostPreview({ post }: Props) {
  const {
    link,
    module: { default: Component, meta },
  } = post;

  return (
    <div className="mb-10">
      <Link href={link}>
        <a className="font-semibold text-lg sm:text-xl md:text-2xl text-red-700 hover:text-red-600 active:text-red-800">
          {meta.title}
        </a>
      </Link>
      <div className="text-xs text-gray-500">{formatRelative(meta.posted, new Date())}</div>
      <div className="mt-2 prose-sm sm:prose md:prose-lg">
        <Component />
      </div>
    </div>
  );
}
