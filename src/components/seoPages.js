import React from "react"
import { Helmet } from "react-helmet"

import decode from 'unescape'


const SEOPages = props => {

  const twitterUsername = props.twitterHandle,
         postTitle = props.postTitle,
         siteTitle = props.siteTitle,
         structuredData = props.structuredData,
         screenshot = props.screenshot,
         canonicalUrl = props.canonicalUrl

   const {
          metaTitle,
          metaDesc,
          opengraphUrl,
          opengraphImage
        } = props.seoData


  return (
    <Helmet 
      title={metaTitle ? decode(metaTitle) : `${postTitle} | ${siteTitle}`}
      link={[ {rel : 'canonical', href : canonicalUrl } ]}
    >
      {metaDesc ? <meta name="description" content={metaDesc} /> : <meta name="description" content="Steven Orechow has a passion for building performance-driven websites by developing and designing a unique, scalable digital experience that will delight your customers, boost your rankings and grow the authority of your business online." />}
      {opengraphImage && <meta name="image" content={opengraphImage} />}
      {opengraphUrl && <meta property="og:url" content={opengraphUrl} />}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={postTitle} />
      {metaDesc !== 0 && <meta property="og:description" content={metaDesc} />}
      {opengraphImage && opengraphImage.localFile.childImageSharp && <meta property="og:image" content={opengraphImage.localFile.childImageSharp.original.src} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {metaTitle ? <meta name="twitter:title" content={metaTitle} /> : <meta name="twitter:title" content={postTitle} />}
      {metaDesc && <meta name="twitter:description" content={metaDesc} />}
      {opengraphImage && opengraphImage.localFile.childImageSharp && <meta name="twitter:image" content={opengraphImage.localFile.childImageSharp.original.src} />}
      {screenshot && <meta property="og:image" content={screenshot} />}
      {structuredData.structureddataschema ? <script type="application/ld+json">{JSON.parse(JSON.stringify(structuredData.structureddataschema))}</script> : console.log('no structured data added')}
    </Helmet>
  )
}
export default SEOPages

