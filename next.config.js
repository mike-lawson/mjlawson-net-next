const rehypePrism = require('@mapbox/rehype-prism');
const { createLoader } = require('simple-functional-loader');

module.exports = {
  // Required for static path routing
  exportTrailingSlash: true,
  pageExtensions: ['tsx', 'mdx'],
  webpack: (config, options) => {
    const mdx = [
      // Loads babel transform last
      options.defaultLoaders.babel,
      {
        // MDX transform
        loader: '@mdx-js/loader',
        options: {
          // Add prism transform
          rehypePlugins: [rehypePrism],
        },
      },
    ];

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        {
          // Used in getPostPreview
          resourceQuery: /preview/,
          use: [
            ...mdx,
            createLoader(function (src) {
              // Provide the option to add the `more` directive for post previews
              if (src.includes('<!--more-->')) {
                const [preview] = src.split('<!--more-->');
                return this.callback(null, preview);
              }
              // Otherwise, we need an excerpt directive
              const [preview] = src.split('<!--/excerpt-->');
              // Because excerpt is at the top - we can safely ignore the rest of the text
              return this.callback(null, preview.replace('<!--excerpt-->', ''));
            }),
          ],
        },
        {
          use: [
            ...mdx,
            createLoader(function (src) {
              // Build the actual post itself
              const content = [
                "import Post from '@/components/Post'",
                src,
                'export default (props) => <Post meta={meta} {...props} />',
              ].join('\n');

              // Remove more directive
              if (content.includes('<!--more-->')) {
                return this.callback(null, content.split('<!--more-->').join('\n'));
              }
              // Remove excerpt
              return this.callback(null, content.replace(/<!--excerpt-->.*<!--\/excerpt-->/s, ''));
            }),
          ],
        },
      ],
    });

    return config;
  },
};
