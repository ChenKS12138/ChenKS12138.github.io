import { Plugin } from "vite";
import fg from "fast-glob";
import path from "path";
import grayMatter from "gray-matter";
import markdownIt from "markdown-it";
import markdownItPlainText from "markdown-it-plain-text";
import dayjs from "dayjs";

const VIRTUAL_MODULE = `virtual:resolve-md`;

interface IPluginResolveMd { }

const PluginResolveMd = async (option: IPluginResolveMd): Promise<Plugin> => {
  const getEntries = () => {
    const globPath = path.join("articles", "./**/*.md");
    const entries = fg.sync(globPath, {
      cwd: process.cwd(),
    });

    return entries;
  };

  return {
    name: "vite-plugin-resolve-md",
    // TODO virtual-module needs watch-files & hot-update
    resolveId(source, _importer, _option) {
      if (source === VIRTUAL_MODULE) {
        return source;
      }
    },
    load(id, _option) {
      if (id === VIRTUAL_MODULE) {
        let code = '\n';
        const entries = getEntries();
        const renderer = markdownIt();
        renderer.use(markdownItPlainText);
        const resolveMdInfo = entries
          .map((entry) => grayMatter.read(entry))
          .filter((one) => one.data.date)
          .sort((a, b) => b.data.date - a.data.date)
          .map((one) => {
            const data = {
              ...one.data,
            };
            const urlPath = (one as any).path
              .replace(/\.md$/, "")
              .replace(/\/index$/, "");
            if (data.coverImage) {
              const imgPath = path.join(
                '/',
                path.dirname((one as any).path),
                data.coverImage
              );
              const imgTmpVar = 'img' + Math.random().toString(16).slice(2);
              code += `\nimport ${imgTmpVar} from '${imgPath}'`;
              data.coverImage = imgTmpVar;
            }
            if (data.date) {
              data.date = dayjs(data.date).format("YYYY-MM-DD");
            }
            if (!data.tags || !Array.isArray(data.tags)) {
              data.tags = [];
            }

            renderer.render(one.content);

            return {
              data,
              path: urlPath,
              brief: String((renderer as any).plainText).slice(0, 100),
            };
          });
        let exportStr = JSON.stringify(resolveMdInfo);
        for (const item of resolveMdInfo) {
          if (item.data.coverImage) {
            exportStr = exportStr.replace(new RegExp(`"${item.data.coverImage}"`), item.data.coverImage);
          }
        }
        code += `\nexport default ${exportStr}`;
        return code;
      }
    },
  };
};

export default PluginResolveMd;
