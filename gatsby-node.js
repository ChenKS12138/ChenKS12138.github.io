const path = require("path");
module.exports = {
  onCreateWebpackConfig(options) {
    const { stage, actions } = options;
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "@": path.resolve("src"),
        },
      },
    });
  },
  async createPages({ graphql, actions, reporter }) {
    const { createPage } = actions;
    const result = await graphql(
      `
        {
          allMarkdownRemark {
            nodes {
              html
              id
              headings {
                value
                depth
              }
              frontmatter {
                date(formatString: "LLLL")
                tags
                title
              }
            }
          }
        }
      `
    );
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`);
      return;
    }
    const blogPostTemplate = path.resolve(`src/pages/detail.tsx`);
    result.data.allMarkdownRemark.nodes.forEach(node => {
      const {
        html,
        id,
        headings,
        frontmatter: { date, tags, title },
      } = node;
      createPage({
        path: `/detail/${id}`,
        component: blogPostTemplate,
        context: {
          html,
          id,
          headings,
          date,
          tags,
          title,
        },
      });
    });
  },
};
