const path = require("path");
const inquire = require("inquirer");
const chalk = require("chalk");
const moment = require("moment");
const fse = require("fs-extra");

const now = moment();

const createPostText = (title, date, tags, indexImage) => `
---
title: ${title}
date: ${date}
tags: ${tags}
index_img: ${indexImage}
---
`;

inquire
  .prompt([
    {
      type: "input",
      name: "title",
      default: `NewPost_${now.format("x")}`,
      message: "Input Title",
    },
    {
      type: "input",
      name: "tags",
      message: "Input Tags Seprate By Space",
      default: "",
    },
    {
      type: "input",
      name: "indexImage",
      default: "",
      message: "Input IndexImg",
    },
  ])
  .then(answers => {
    const { title, tags, indexImage } = answers;
    const date = now.format("YYYY-MM-DD HH:mm:ss");
    const postText = createPostText(
      title,
      date,
      JSON.stringify(tags.split(" ")),
      indexImage
    );
    const postFilePath = path.resolve(`./posts/${title}.md`);
    if (fse.existsSync(postFilePath)) {
      console.log(chalk.bold.red("File Exists!"));
      process.exit(1);
    } else {
      try {
        fse.writeFileSync(postFilePath, postText);
        console.log(
          chalk.bold.green(`Create Post File Success At ${postFilePath}`)
        );
      } catch (e) {
        console.log(chalk.bold.red(String(e)));
        process.exit(2);
      }
    }
  });
