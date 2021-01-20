import React from "react"

import Layout from '../../layouts/index'
import SEOPages from "../seoPages"

function SinglePageBlank({ data }) {
  const { page, allSite } = data
  const { title, content } = page,
        siteTitle = allSite.nodes[0].siteMetadata.title,
        siteUrl = allSite.nodes[0].siteMetadata.siteUrl


  let twitterUsername = '@stevenorechow'
  const structuredData = page.structured_data

  return (
      <Layout>
        <SEOPages 
          seoData={page.seo} 
          twitterHandle={twitterUsername}
          postTitle={title} 
          siteTitle={siteTitle}
          structuredData={structuredData}
          canonicalUrl={page.seo.canonicalUrl ? page.seo.canonicalUrl : siteUrl + '/' + page.slug + '/'}
        />
        <main className="my-20 px-4 md:px-0">
          <article>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </main>
      </Layout>
  )
}

export default SinglePageBlank
