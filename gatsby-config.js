require("dotenv").config({
  path: `.env.GATSBY_CONCURRENT_DOWNLOAD`,
})

// require .env.development or .env.production
require("dotenv").config()

const tailwindConfig = require("./tailwind.config.js");

module.exports = {
  siteMetadata: {
    title: 'Taylor Wilkinson',
    description: "I'm a freelance web developer who's passionate about WordPress and JavaScript",
    email: 'taylor@twilkinson.com',
    siteUrl: 'https://twilkinson.com/',
  },
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `PT Mono`,
            },
            {
              family: "Montserrat",
              variants: ["400", "500", "700"],
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url:
          process.env.WPGRAPHQL_URL,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/images/icons/android-chrome-512x512.png',
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `http://localhost/headless/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-svg`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-BE9G2JEQNC", // Google Analytics / GA
    //      "AW-CONVERSION_ID", // Google Ads / Adwords / AW
     //    "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "G-BE9G2JEQNC",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific tos this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    }, 
    `gatsby-plugin-netlify-cache`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    `gatsby-wordpress-experimental-inline-images`,
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-client-side-redirect`
  ],
}
