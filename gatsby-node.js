const { resolve } = require(`path`)
const path = require(`path`)
const glob = require(`glob`)
const chunk = require(`lodash/chunk`)
const { dd } = require(`dumper.js`)

const getTemplates = () => {
  const sitePath = path.resolve(`./`)
  return glob.sync(`./src/templates/**/*.js`, { cwd: sitePath })
}

// @todo move this to gatsby-theme-wordpress
exports.createPages = async ({ actions, graphql, reporter }) => {

  // Page Redirects
  const {createRedirect} = actions //actions is collection of many actions - https://www.gatsbyjs.org/docs/actions
  createRedirect({ fromPath: '/hello-world/', toPath: '/modern-web-design', isPermanent: true });
  createRedirect({ fromPath: '/home/', toPath: '/', isPermanent: true });
  createRedirect({ fromPath: '/5-mac-apps-i-use-daily-to-build-better-websites/', toPath: '/modern-web-design', isPermanent: true });
  createRedirect({ fromPath: '/why-having-a-fast-website-matters/', toPath: '/modern-web-design', isPermanent: true });
  createRedirect({ fromPath: '/getting-quality-seo-results/', toPath: '/modern-web-design', isPermanent: true });
  

  
  const templates = getTemplates()

  const {
    data: {
      allWpContentNode: { nodes: contentNodes },
    },
  } = await graphql(/* GraphQL */ `
    query ALL_CONTENT_NODES {
      allWpContentNode(
        sort: { fields: modifiedGmt, order: DESC }
        filter: { nodeType: { ne: "MediaItem" } }
      ) {
        nodes {
          nodeType
          uri
          id
        }
      }
    }
  `)

  const contentTypeTemplateDirectory = `./src/templates/single/`

  const createCategories = require(`./create/createCatecories`)

  const contentTypeTemplates = templates.filter((path) =>
    path.includes(contentTypeTemplateDirectory)
  )

  await Promise.all(
    contentNodes.map(async (node, i) => {
      const { nodeType, uri, id } = node
      // this is a super super basic template hierarchy
      // this doesn't reflect what our hierarchy will look like.
      // this is for testing/demo purposes
      const templatePath = `${contentTypeTemplateDirectory}${nodeType}.js`

      const contentTypeTemplate = contentTypeTemplates.find(
        (path) => path === templatePath
      )

      if (!contentTypeTemplate) {
        return
      }
      if(uri === '/home/') {
        return
      }
      await actions.createPage({
        component: resolve(contentTypeTemplate),
        path: uri,
        context: {
          id,
          nextPage: (contentNodes[i + 1] || {}).id,
          previousPage: (contentNodes[i - 1] || {}).id,
        },
      })
    })
    
  )

  // create the homepage
  const {
    data: { allWpPost },
  } = await graphql(/* GraphQL */ `
    {
      allWpPost(sort: { fields: modifiedGmt, order: DESC }) {
        nodes {
          uri
          id
        }
      }
    }
  `)

  const perPage = 6
  const chunkedContentNodes = chunk(allWpPost.nodes, perPage)

  await Promise.all(
    chunkedContentNodes.map(async (nodesChunk, index) => {
      const firstNode = nodesChunk[0]
      const page = index + 1
      const offset = perPage * index

      await actions.createPage({
        component: resolve(`./src/templates/index.js`),
        path: page === 1 ? `/blog/` : `/blog/${page}/`,
        context: {
          firstId: firstNode.id,
          page: page,
          offset: offset,
          totalPages: chunkedContentNodes.length,
          perPage,
        },
      })
    })
  )

  await createCategories(actions,graphql, { perPage })

}

