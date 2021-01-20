import React from 'react';
// import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import LazyLoad from 'react-lazyload';

// Components
import Layout from '../layouts/index'

import SEOPages from '../components/seoPages'


// Screenshot
import screenshot from '../../screenshot.png';


const IndexTemplate = () => (
  <main>
    <p>Placeholder for homepage</p>
  </main>
);

const Index = ({ data }) => {

  const { allWp, wpPage, allSite } = data;


  return (
    <Layout>
      <IndexTemplate />
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    allSite {
      nodes {
        siteMetadata {
          siteUrl
        }
      }
    }
    allWp {
      edges {
        node {
          generalSettings {
            description
            title
            url
          }
        }
      }
    }
    wpPage( title: {eq: "Home"}) {
        id
        content
        slug
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
  }
`;
