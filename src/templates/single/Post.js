import React from "react"
import { graphql } from "gatsby"
import BlogPost from "../../components/template-parts/blog-post"

export default ({ data }) => {
  return <BlogPost data={data} />
} 

export const query = graphql`
  query postsAndPosts($id: String!, $nextPage: String, $previousPage: String) {
    page: wpPost(id: { eq: $id }) {
      title
      slug
      content
      excerpt
      author {
        node {
          firstName
          lastName
        }
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
      categories {
        nodes {
          slug
          uri
          id
          name
        }
      }
      structured_data {
        structureddataschema
      }
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          sourceUrl
          localFile {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid_noBase64
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
          siteUrl
        }
      }
    }
    

    nextPage: wpPost(id: { eq: $nextPage }) {
      title
      uri
    }

    previousPage: wpPost(id: { eq: $previousPage }) {
      title
      uri
    }
  }
`
