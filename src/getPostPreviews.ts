function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map((fileName) => ({
    link: fileName.substr(1).replace(/\/index\.mdx$/, ''),
    module: r(fileName),
  }));
}

export default function getAllPostPreviews() {
  return importAll(require.context('./pages/?preview', true, /\.mdx$/));
}
