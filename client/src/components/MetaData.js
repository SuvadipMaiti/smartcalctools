import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title, description, keywords, author,image,currentUrl }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="summary" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="source" content={author} />
        <link rel="canonical" href={currentUrl} />
        <meta property="url" content={currentUrl} />
        <meta property="originalUrl" content={currentUrl} />
        <meta property="image" content={image} />
        <meta property="media" content={image} />
        <meta property="shareMediaCategory" content={image} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:secure_url" content={image} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta property="og:url" content={currentUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <meta property="og:site_name" content="smart calculator tools: SmartCalcTools" />
        
        <meta property="og:type" content="website" />
      </Helmet>
    </>
  );
};

export default MetaData;
