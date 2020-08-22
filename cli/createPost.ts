import * as path from "path";
import * as inquire from "inquirer";
import * as chalk from "chalk";
import * as moment from "moment";
import * as fse from "fs-extra";

const now = moment();

const createPostText = (
  title: string,
  date: string,
  tags: string,
  indexImage: string
) => `
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
  .then((answers: { title: string; tags: string; indexImage: string }) => {
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
