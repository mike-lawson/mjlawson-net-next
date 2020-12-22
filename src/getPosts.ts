import { Post } from '@/types';

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map((fileName) => ({
    link: fileName.substr(1).replace(/\/index\.mdx$/, ''),
    module: r(fileName),
  }));
}

export default importAll(require.context('./pages/blog/', true, /\.mdx$/)) as Array<Post>;
