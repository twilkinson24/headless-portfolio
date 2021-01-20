import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Layout from '../../layouts/index'
import SEOPages from "../../components/seoPages"

import ArchivePagination from "../../components/archive-pagination"

const Archive = (props) => {

  const {
    data: {
      allWpPost: { nodes, pageInfo },
      wpCategory: category,
      allSite: site
    },
    pageContext: { archivePath },
  } = props

  const siteTitle = site.nodes[0].siteMetadata.title


//  post.featuredImage.node.localFile.childImageSharp.original.src} 

  let twitterUsername = '@stevenorechow'

  return (
    <Layout>
      <SEOPages 
        seoData={category.seo} 
        twitterHandle={twitterUsername}
        postTitle={category.name} 
        siteTitle={siteTitle}
        structuredData={false}
      /> 
      <div className="container px-4 md:px-0 my-20">  
        <header>
          <h1 className="text-black text-3xl sm:text-5xl font-bold mb-5">
            {category.name}
          </h1>
        </header>
        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">

      {nodes &&
        nodes.map((post, index) => {

          const excerpt = post.excerpt,
                    
          shortenedExcerpt = () => {
            if(excerpt.length > 0) {
              const excerptShortened = excerpt.slice(0, 300);
              return (                              
              <p className="mt-3 text-base text-gray leading-6 no-underline" dangerouslySetInnerHTML={{ __html: excerptShortened }} />
              );
            } else {
              return null;
            }
          }

          const featuredImage = post.featuredImage

          let imagePath, isFtImgSVG
        
        
          if(featuredImage) {
           if(featuredImage.node.localFile.childImageSharp) {
              isFtImgSVG = false
              imagePath = featuredImage.node.localFile.childImageSharp.fluid
           } else {
            isFtImgSVG = true
            imagePath = featuredImage.node.sourceUrl
           } 
          }
    
              return (
                  <article className="flex flex-col rounded-lg shadow-lg overflow-hidden" key={`blog-post-${index}`}>
                    <div className="flex-shrink-0">
                    {isFtImgSVG ?
                      <Link to={`/${post.slug}`}>
                        <img src={imagePath} alt={post.title} />
                      </Link>
                    :
                      <Link to={`/${post.slug}`}>
                        <Img fluid={imagePath} 
                        objectFit="cover" 
                        objectPosition="50% 50%" 
                        alt={post.title} 
                        className="w-full object-cover h-64 rounded-md"
                        />
                      </Link>
                    }
                    </div>
                    <div className="blog-post-text-content flex-1 p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <Link to={`/${post.slug}`} className="block no-underline text-gray-500">
                          <h3 className="mt-2 text-xl leading-7 font-semibold text-blue">
                            {post.title}
                          </h3>
                          {excerpt.length > 0 ? shortenedExcerpt() : null}
                        </Link>
                      </div>
                      <div className="mt-6 flex-1 flex flex-col justify-end">
                        <div className="mt-6 flex text-sm leading-5 text-gray-500">
                          <time>
                            {post.date}
                          </time>
                        </div>
                      </div>
                  </div>
                </article>
    
                  );
              })}

            <ArchivePagination {...pageInfo} archivePath={archivePath} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ArchivePageandArchivePage(
    $offset: Int!
    $perPage: Int!
    $categoryDatabaseId: Int
  ) {
    wpCategory(databaseId: {eq: $categoryDatabaseId}) {
      id
      name
      seo {
        canonicalUrl
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        metaTitle
        opengraphDescription
        opengraphTitle
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          mediaItemUrl
        }
      }
    }
    allSite {
      nodes {
        siteMetadata {
          title
        }
      }
    }
    allWpPost(
      limit: $perPage
      skip: $offset
      filter: {
        categories: {
          nodes: { elemMatch: { databaseId: { eq: $categoryDatabaseId } } }
        }
      }
      sort: { fields: date, order: DESC }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        currentPage
        pageCount
      }
      nodes {
        uri
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        slug
        featuredImage {
          node {
            sourceUrl
            altText
            localFile {
              childImageSharp {
              original {
                src
              }
            }
            }
          }
        }
      }
    }
  }
`

export default Archive