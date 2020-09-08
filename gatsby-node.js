const path = require("path");
const fs = require("fs").promises;
const glob = require("glob");

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
    // if (stage === "build-javascript") {
    //   actions.setWebpackConfig({
    //     devtool: false,
    //   });
    // }
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
  onPostBuild: async function () {
    if (!process.env.PAGE_PADA_HASH) return;
    const publicPath = path.join(__dirname, "public");
    const hash = Date.now();
    const jsonFiles = glob.sync(`${publicPath}/page-data/**/page-data.json`);
    console.log("[onPostBuild] Renaming the following files:");
    for (let file of jsonFiles) {
      console.log(file);
      const newFilename = file.replace(
        `page-data.json`,
        `page-data.${hash}.json`
      );

      await fs.rename(file, newFilename);
    }
    const appShaFiles = glob.sync(`${publicPath}/**/app-*.js`);
    const [appShaFile] = appShaFiles;
    const [appShaFilename] = appShaFile.split("/").slice(-1);
    const appShaFilenameReg = new RegExp(appShaFilename, "g");
    const newAppShaFilename = `app-${hash}.js`;
    const newFilePath = appShaFile.replace(appShaFilename, newAppShaFilename);
    console.log(
      `[onPostBuild] Renaming: ${appShaFilename} to ${newAppShaFilename}`
    );
    await fs.rename(appShaFile, newFilePath);
    await fs.rename(`${appShaFile}.map`, `${newFilePath}.map`);
    const htmlJSAndJSONFiles = [
      `${newFilePath}.map`,
      ...glob.sync(`${publicPath}/**/*.{html,js,json}`),
    ];
    console.log(
      `[onPostBuild] Replacing page-data.json, ${appShaFilename}, and ${appShaFilename}.map references in the following files:`
    );
    for (let file of htmlJSAndJSONFiles) {
      const stats = await fs.stat(file, "utf8");

      if (!stats.isFile()) {
        continue;
      }

      const content = await fs.readFile(file, "utf8");
      const result = content
        .replace(appShaFilenameReg, newAppShaFilename)
        .replace(/page-data\.json/g, `page-data.${hash}.json`);
      if (result !== content) {
        console.log(file);
        await fs.writeFile(file, result, "utf8");
      }
    }
  },
};
