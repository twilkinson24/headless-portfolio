import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

export function FooterTemplate({ footerContent }) {

  return (
    <footer className="footer text-center mt-20" role="contentinfo">
      <div className="container px-4 md:px-6 lg:px-0">
        <div className="footer-contact mb-16">
          <div dangerouslySetInnerHTML={{ __html: footerContent.home_and_header_footer.topFooter }} />
        </div>
        <div className="footer-copyright mb-8">
          <div dangerouslySetInnerHTML={{ __html: footerContent.home_and_header_footer.copyrightArea }} />
        </div>
      </div>
    </footer>
  );
}


const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        wpPage( title: {eq: "Home"}) {
          home_and_header_footer {
            topFooter
            copyrightArea
          }
        }
      }
    `}
    render={(query) => {
      const { wpPage: footer } = query;
      return <FooterTemplate footerContent={footer} />;
    }}
  />
);

export default Footer;
