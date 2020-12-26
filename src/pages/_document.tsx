/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  renderGA = () => (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TAG_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.GA_TAG_ID}');`,
        }}
      />
    </>
  );

  render() {
    return (
      <Html>
        <Head>
          {process.env.GA_TAG_ID && this.renderGA()}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        </Head>
        <body className="bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
