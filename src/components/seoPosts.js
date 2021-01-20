import React from "react"
import { Helmet } from "react-helmet"

import decode from 'unescape'


const SEOPosts = props => {

  const twitterUsername = props.twitterHandle,
         postTitle = props.postTitle,
         siteTitle = props.siteTitle,
         postExcerpt = props.postExcerpt,
         structuredData = props.structuredData,
         canonicalUrl = props.canonicalUrl

   const {
          metaTitle,
          title,
          metaDesc,
          opengraphUrl,
          opengraphImage
        } = props.seoData



  return (
    <Helmet 
      title={metaTitle ? decode(metaTitle) : `${postTitle} | ${siteTitle}`}
      link={[ {rel : 'canonical', href : canonicalUrl } ]}
    >

      {metaDesc ? <meta name="description" content={metaDesc} /> : <meta name="description" content={postExcerpt} />}
      <meta name="image" content={opengraphImage} />
      {opengraphUrl && <meta property="og:url" content={opengraphUrl} />}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={postTitle} />
      {metaDesc !== 0 ? <meta property="og:description" content={metaDesc} /> : <meta property="og:description" content={postExcerpt} />}
      {opengraphImage && opengraphImage.localFile.childImageSharp && <meta property="og:image" content={opengraphImage.localFile.childImageSharp.original.src} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {metaTitle ? <meta name="twitter:title" content={title} /> : <meta name="twitter:title" content={postTitle} />}
      {metaDesc ?  <meta name="twitter:description" content={metaDesc} /> : <meta name="twitter:description" content={postExcerpt} />}
      {opengraphImage && opengraphImage.localFile.childImageSharp && <meta name="twitter:image" content={opengraphImage.localFile.childImageSharp.original.src} />}
      {structuredData.structureddataschema && <script type="application/ld+json">{JSON.parse(JSON.stringify(structuredData.structureddataschema))}</script>}
    </Helmet>
  )
}
export default SEOPosts

