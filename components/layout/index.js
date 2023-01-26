import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>beLittle — Upload, Compress & Download</title>
        <meta name="title" content="beLittle — Upload, Compress & Download" />
        <meta
          name="description"
          content="Compress images without losing quality with beLittle. Save storage space and improve website loading speed with our advanced image compression technology"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta
          property="og:title"
          content="beLittle — Upload, Compress & Download"
        />
        <meta
          property="og:description"
          content="Compress images without losing quality with beLittle. Save storage space and improve website loading speed with our advanced image compression technology"
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta
          property="twitter:title"
          content="beLittle — Upload, Compress & Download"
        />
        <meta
          property="twitter:description"
          content="Compress images without losing quality with beLittle. Save storage space and improve website loading speed with our advanced image compression technology"
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        ></meta>
      </Head>
      <div className="flex min-h-screen flex-col">{children}</div>
    </>
  );
};

export default Layout;
