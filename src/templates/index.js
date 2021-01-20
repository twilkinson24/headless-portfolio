import React from "react"
import { graphql, Link, navigate } from "gatsby"
import ReactPaginate from "react-paginate"
import { Helmet } from "react-helmet"

import decode from 'unescape'

import Img from "gatsby-image"

import Layout from '../layouts/index'

export default ({ data, pageContext }) => {

  const posts = data.allWpPost.nodes

  const siteTitle = data.allSite.nodes[0].siteMetadata.title,
        // metaDesc = data.allSite.nodes[0].siteMetadata.description,
        metaDesc = "My blog will cover unique aspects of SEO/SEM, web design and development. I will share various strategies for building and growing a business website.",
        twitterUsername = '@stevenorechow'
  
  const gray = 'rgb(210, 214, 220)',
        grayText = 'rgb(37, 47, 63)',
        red = 'rgb(253, 232, 232)',
        redText = 'rgb(155, 28, 28)',
        orange = 'rgb(254, 236, 220)',
        orangeText = 'rgb(138, 44, 13)',
        yellow = 'rgb(253, 246, 178)',
        yellowText = 'rgb(114, 59, 19)',
        green = 'rgb(222, 247, 236)',
        greenText = 'rgb(3, 84, 63)',
        teal = 'rgb(213, 245, 246)',
        tealText = 'rgb(5, 80, 92)',
        blue = 'rgb(225, 239, 254)',
        blueText = 'rgb(30, 66, 159)',
        purple = 'rgb(237, 235, 254)',
        purpleText = 'rgb(85, 33, 181)',
        pink = 'rgb(252, 232, 243)',
        pinkText = 'rgb(153, 21, 75)';

  const categoryColors = [
    [gray, grayText],
    [red, redText],
    [orange, orangeText],
    [yellow, yellowText],
    [green, greenText],
    [teal, tealText],
    [blue, blueText],
    [purple, purpleText],
    [pink, pinkText],
  ];

  return (
    <Layout>
       <Helmet title={`Blog – Steven Orechow`}>
        {metaDesc && <meta name="description" content={decode(metaDesc)} />}
        <meta property="og:title" content="blog" />
        {metaDesc !== 0 && <meta property="og:description" content={metaDesc} />}
        <meta name="twitter:card" content="summary_large_image" />
        {twitterUsername && (
          <meta name="twitter:creator" content={twitterUsername} />
        )}
        {<meta name="twitter:title" content={`Blog – Steven Orechow`} />}
        {
          <script type="application/ld+json">{JSON.parse(JSON.stringify(`{
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://stevenorechow.me/blog/"
            },
            "headline": "Blog - Steven Orechow",
            "image": [
            {
            "@type": "ImageObject",
            "url": "//https://stevenorechow.me/icons/icon-384x384.png?v=760b8f1987d714a6dce64aabf3cb0d08",
            "width": 384,
            "height": 384,
            "name": "icon-384x384"
            }
            ],
            "datePublished": "2020-11-20T00:00+02:00",
            "dateModified": "2020-11-20T17:01:18.742Z",
            "author": {
            "@type": "Person",
            "name": "Steven Orechow"
            },
            "publisher": {
            "@type": "Organization",
            "name": "Steven Orechow",
            "logo": {
            "@type": "ImageObject",
            "url": "https://stevenorechow.me/static/6362c40934d642f848b834e810dbe3c2/88df8/steven-orechow-web-developer.jpg"
            }
            },
            "description": "My blog will cover unique aspects of SEO/SEM, web design and development. I'll share various strategies for building and growing a business website."
            }`))}</script>
        }
      </Helmet>  
      <main className="container my-20 px-4 md:px-0">
        <header>
          <h1 className="text-black text-3xl sm:text-5xl font-bold mb-5">Blog</h1>
        </header>
        <div className="container px-4 md:px-0 mb-20" id="blog-page-grid">  
          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {posts.map((item, key) => {

          const excerpt = item.excerpt,
                        
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
            
            const featuredImage = item.featuredImage

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
                  <article className="flex flex-col rounded-lg shadow-lg overflow-hidden" key={`blog-post-${key}`}>
                    <div className="flex-shrink-0">
                      {isFtImgSVG ?
                          <Link to={`/${item.slug}`}>
                            <img src={imagePath} alt={`${item.featuredImage.node.altText ? item.featuredImage.node.altText : 'graphic for the post ' + item.title}`} />
                          </Link>
                        :
                          <Link to={`/${item.slug}`}>
                            <Img fluid={imagePath} 
                            objectFit="cover" 
                            objectPosition="50% 50%" 
                            alt={`${item.featuredImage.node.altText ? item.featuredImage.node.altText : 'graphic for the post ' + item.title}`} 
                            className="w-full object-cover h-64 rounded-md"
                            />
                          </Link>
                        }
                    </div>
                    <div className="blog-post-text-content flex-1 p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <Link to={`/${item.slug}`} className="block no-underline text-gray-500">
                          <h3 className="mt-2 text-xl leading-7 font-semibold text-blue">
                            {item.title}
                          </h3>
                          {excerpt.length > 0 ? shortenedExcerpt() : null}
                        </Link>
                      </div>
                      <div className="mt-6 flex-1 flex flex-col justify-end">
                        <div className="mt-6">
                        {item.categories.nodes.map((cat, key) => {
                          const randomColorNo = Math.floor(Math.random() * categoryColors.length),
                                backgroundColor = categoryColors[randomColorNo][0],
                                textColor = categoryColors[randomColorNo][1];

                          return (
                            <Link className={`inline-flex items-center px-2.5 py-0.5 mr-3 rounded-full text-xs font-medium leading-4 px-3 py-1 no-underline`}
                                style={{
                                  backgroundColor: backgroundColor,
                                  color: textColor
                                }}
                                key={item.slug+key} 
                                to={'/' + cat.slug}>
                              {cat.name}
                            </Link>
                          );
                        })}
                          
                        </div>
                        <div className="mt-6 flex text-sm leading-5 text-gray-500">
                          <time>
                            {item.date}
                          </time>
                        </div>
                      </div>
                  </div>
                </article>



                  );
              })}
            </div>
            {pageContext && pageContext.totalPages > 1 && (
          <nav className="border-t border-gray-200 px-4 sm:px-0 mt-20">
            <ReactPaginate
              previousLabel={
                pageContext?.page !== 1 && <span className="flex hover:border-gray-300">
                <svg className="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg><span className="hidden md:inline-block">Previous page</span></span>
              }
              nextLabel={
                pageContext?.totalPages !== pageContext.page && (
                  <span className="flex hover:border-gray-300">
                    <span className="flex justify-end w-full">
                      <span className="hidden md:inline-block">Next page</span>
                      <svg className="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </span>
                )
              }
              onPageChange={({ selected }) => {
                const page = selected + 1
                const path = page === 1 ? `/blog` : `/blog/${page}`
                navigate(path)
              }}
              disableInitialCallback
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageContext.totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              nextLinkClassName="inline-block flex-1 w-full pt-4 -mt-px border-t-2 border-transparent px-4 items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150"
              previousLinkClassName="inline-block flex-1 w-full pt-4 -mt-px border-t-2 border-transparent px-4 items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150"
              pageLinkClassName="border-t-2 border-transparent pt-4 px-4 inline-block items-center text-sm leading-5 font-medium"
              containerClassName={"pagination flex items-center justify-center"}
              nextClassName={"block w-full"}
              previousClassName={"block w-full"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              activeLinkClassName="-mt-px border-t-2 pt-4 px-4 items-center text-sm leading-5 font-medium focus:outline-none transition ease-in-out duration-150"
              initialPage={pageContext.page - 1}
            />
          </nav>
        )}
      </div>
    </main>
</Layout>
);
}


export const query = graphql`
  fragment Thumbnail on File {
    childImageSharp {
      fluid(maxWidth: 500) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  query BlogPosts($offset: Int!, $perPage: Int!) {
    allWpPost(
      limit: $perPage
      skip: $offset
      filter: { nodeType: { in: ["Post", "Page", "Alot"] } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        uri
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        slug
        categories {
          nodes {
            uri
            slug
            id
            name
          }
        }
        featuredImage {
          node {
            altText
            sourceUrl
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
            }
            }
          }
        }
      }
    }
    allSite {
      nodes {
        siteMetadata {
          title
          description
        }
      }
    }
  }
`