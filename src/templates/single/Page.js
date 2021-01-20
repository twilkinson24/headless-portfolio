import React from "react"
import { graphql } from "gatsby"
import SinglePage from "../../components/template-parts/single-page"
import SinglePageBlank from "../../components/template-parts/single-page-blank"
import ProjectsTemplate from "../../components/template-parts/projects"
import ProcessTemplate from "../../components/template-parts/process"

export default ({ data }) => {
  if(data.page.template.__typename !== "WpDefaultTemplate") {

    if(data.page.template.__typename === 'WpBlankTemplate') {

      if(data.page.title === 'Process') {
          return <ProcessTemplate data={data} />
      } else {
        return <SinglePageBlank data={data} />
      }

    } else if(data.page.template.__typename === 'WpTemplate_Portfolio') {

      return <ProjectsTemplate data={data} />

    } else { // default

      return <SinglePage data={data} />
    }
    
  } else {
    return <SinglePage data={data} />
  } // use this for templates */
}

export const query = graphql`
  query pages($id: String!, $nextPage: String, $previousPage: String) {
    page: wpPage(id: { eq: $id }) {
      title
      slug
      content
      template {
        __typename
      }
      isFrontPage
      structured_data {
        structureddataschema
      }
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
      featuredImage {
        node {
          remoteFile {
            ...HeroImage
          }
        }
      }
    }

    allSite {
      nodes {
        siteMetadata {
          title
          siteUrl
        }
      }
    }

    nextPage: wpPage(id: { eq: $nextPage }) {
      title
      uri
    }

    previousPage: wpPage(id: { eq: $previousPage }) {
      title
      uri
    }
  }
`
