/**
 * Configure your Gatsby site with this file.
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Vista.io - The New Standard in Data Analysis`,
    description: `Use Data to Get a 360-Degree View of Your Business`,
    author: `@kaizent`,
    siteUrl: `https://kaizent.io`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/public/images`,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `kaizent-data-analytics`,
    //     short_name: `kaizent`,
    //     start_url: `/`,
    //     background_color: `#0039c6`,
    //     theme_color: `#0039c6`,
    //     display: `minimal-ui`,
    //     icon: `src/images/kaizent-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
  ],
}