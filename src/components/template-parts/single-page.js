import React from "react"

import Layout from '../../layouts/index'
import SEOPages from "../seoPages"

function SinglePage({ data }) {
  const { page, allSite } = data
  const { title, content } = page,
        siteTitle = allSite.nodes[0].siteMetadata.title,
        siteUrl = allSite.nodes[0].siteMetadata.siteUrl

  const structuredData = page.structured_data

  let twitterUsername = '@stevenorechow'

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
        <main className="container my-20 px-4">
          <article>
            <header>
              <h1 className="text-black text-3xl sm:text-5xl font-bold mb-5" dangerouslySetInnerHTML={{ __html: title }} />
            </header>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </main>
      </Layout>
  )
}

export default SinglePage
