import React from "react"
import { StaticQuery, graphql } from 'gatsby';
import Img from "gatsby-image"

import Layout from '../../layouts/index'
import SEOPages from "../seoPages"


function ProjectsTemplate({ data }) {
  const { page, allSite } = data,
          siteTitle = allSite.nodes[0].siteMetadata.title;
  const { title, content } = page
  const structuredData = page.structured_data
  const siteUrl = allSite.nodes[0].siteMetadata.siteUrl

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
        <main className="container my-20 px-4 md:px-0">
          <article>
            <header>
              <h1 className="text-black text-4xl lg:text-5xl font-bold" dangerouslySetInnerHTML={{ __html: title }} />
            </header>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />
              <StaticQuery
                  query={graphql`
                      query ProjectsQuery {
                          allWpProject {
                              edges {
                                node {
                                  id
                                  title
                                  cpt_projects {
                                    fieldGroupName
                                    projectInfo
                                    projectLink
                                    projectTitle
                                    projectImage {
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
                            }
                      }
                  `}
                  render={data => (
                      <section className="portfolio-sections block md:flex md:flex-row md:flex-wrap lg:flex-col px-2 my-20">
                      {data.allWpProject.edges.map((val,key) => {
                      const sectionTitle=val.node.cpt_projects.projectTitle,
                                sectionTextContent = val.node.cpt_projects.projectInfo;
                          return (
                            <div className={`flex-section w-full md:w-2/5 lg:w-full mb-20 mr-0 md:mr-8 lg:mr-0 flex flex-col ${key % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`} key={`homeflex-${key}`}>
                              <div className={`img-wrap h-auto w-full md:w-full lg:w-2/5 mb-8 lg:mb-0 ${key % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                                <Img fluid={val.node.cpt_projects.projectImage.localFile.childImageSharp.fluid} 
                                  objectFit="cover" 
                                  objectPosition="50% 50%" 
                                  alt={sectionTitle} 
                                  className={`section-image rounded-md`}
                                />
                              </div>

                              <div className="flex-auto flex flex-col">
                                  <h3 className="font-bold text-xl lg:text-2xl mb-5">{sectionTitle}</h3>
                                  <div className="text-content" dangerouslySetInnerHTML={{ __html: sectionTextContent }} /> 
                                      <div className="mt-3">
                                        <a target="_blank" rel="noopener noreferrer nofollow" href={val.node.cpt_projects.projectLink} className="button">
                                            See Website
                                        </a>
                                      </div>
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

export default ProjectsTemplate
