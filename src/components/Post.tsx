import formatRelative from 'date-fns/formatRelative';
import { PostMeta } from '@/types';

type Props = {
  meta: PostMeta;
  children: JSX.Element;
};

export default function Post({ meta, children }: Props) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-black text-red-700">{meta.title}</h1>
      <div className="text-xs mt-1 md:text-sm text-gray-600">
        Posted{' '}
        <time dateTime={meta.posted.toISOString()}>{formatRelative(meta.posted, new Date())}</time>
      </div>
      <article className="mt-5 prose-sm prose sm:prose-lg">{children}</article>
    </div>
  );
}
