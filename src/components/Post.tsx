import { PostMeta } from '@/types';
import { useEffect, useState } from 'react';

type Props = {
  meta: PostMeta;
  children: JSX.Element;
};

export default function Post({ meta, children }: Props) {
  const [displayTime, setDisplayTime] = useState(meta.posted.toLocaleDateString());
  useEffect(() => {
    if (navigator && navigator.language) {
      setDisplayTime(new Intl.DateTimeFormat(navigator.language).format(meta.posted));
    }
  }, [meta.posted]);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-black text-red-700">{meta.title}</h1>
      <div className="text-xs mt-1 md:text-sm text-gray-600">
        <time dateTime={meta.posted.toISOString()}>{displayTime}</time>
      </div>
      <article className="mt-5 prose-sm prose sm:prose-lg">{children}</article>
    </div>
  );
}
