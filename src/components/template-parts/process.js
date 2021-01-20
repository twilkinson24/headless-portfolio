import React from "react"
import { StaticQuery, graphql } from 'gatsby';
import Img from "gatsby-image"

import Layout from '../../layouts/index'
import SEOPages from "../seoPages"
import AnimatedIllustration from "./animated-illustration"


function ProcessTemplate({ data }) {
  const { page, allSite } = data,
          siteTitle = allSite.nodes[0].siteMetadata.title;
  const { title, content } = page
  const structuredData = page.structured_data,
        siteUrl = allSite.nodes[0].siteMetadata.siteUrl

  
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
        <main className="my-20 px-4 md:px-0">
          <article>

            <div className="post-content mb-20" dangerouslySetInnerHTML={{ __html: content }} />
              <StaticQuery
                  query={graphql`
                      query ProcessQuery {
                          allWpPage (filter: {title: {eq: "Process"}}){
                              edges {
                                node {
                                  id
                                  process_fields {
                                    processSections {
                                      autoplayAnimation
                                      fieldGroupName
                                      height
                                      processAnimationData
                                      processIllustrationOrImage
                                      processImage {
                                          altText
                                          localFile {
                                            childImageSharp {
                                              fluid {
                                                  ...GatsbyImageSharpFluid
                                              }
                                            }
                                          }
                                        }
                                      textContent
                                      width
                                      processLoopAnimation
                                    }
                                  }
                                }
                              }
                          }
                      }
                  `}
                  render={(processData)=> (
                      
                      <section className="container process-sections block md:flex md:flex-row md:flex-wrap lg:flex-col px-2 my-20">
                      {processData.allWpPage.edges[0].node.process_fields.processSections.map((val,key) => {
                      const sectionTextContent = val.textContent,
                              illustrationOrImg = val.processIllustrationOrImage;

                          return (
                            <div className={`process-section w-full mb-20 mr-0 md:mr-8 lg:mr-0 flex flex-col ${key % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`} key={`process-${key}`}>
                              <div className={`img-wrap h-auto w-full lg:w-1/2 mb-8 lg:mb-0 ${illustrationOrImg === "Image" ? 'img-wrap' : 'illustration-wrap'} ${key % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                                  {illustrationOrImg === "Image" ? 
                                      <Img fluid={val.processImage.localFile.childImageSharp.fluid} 
                                          objectFit="cover" 
                                          objectPosition="50% 50%" 
                                          alt={val.processImage.altText} 
                                          className={`section-image rounded-md`}
                                      />
                                  :
                                      <AnimatedIllustration 
                                          height={val.height}
                                          width={val.width}
                                          isLooping={val.processLoopAnimation}
                                          isAutoPlayOn={val.autoplayAnimation}
                                          animationData={val.processAnimationData}
                                      /> 
                                  }
                                
                              </div>
                              <div className="flex-auto w-full lg:w-1/2">
                                <div className="text-content" dangerouslySetInnerHTML={{ __html: sectionTextContent }} /> 
                              </div>
                          </div> 
                          ); 
                        })} 
                      </section>
                  )}
              />
          </article>
        </main>
      </Layout>
  )
}

export default ProcessTemplate
