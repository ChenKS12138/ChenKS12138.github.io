import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'unplugin-vue-markdown/vite'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import PluginResolveMd from './plugins/vite-plugin-resolve-md'
import MarkdownItPrism from 'markdown-it-prism';
import MarkdownItAnchor from 'markdown-it-anchor';
import grayMatter from "gray-matter";

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { toString as mdAstToString } from 'mdast-util-to-string';

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

const config = defineConfig({
  mode: 'spa',
  resolve: {
    alias: {
      '~/': `${resolve(_dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    Unocss(),

    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      markdownItSetup(md) {
        md.use(MarkdownItPrism)
        md.use(MarkdownItAnchor)
      },
      // Class names for the wrapper div
      wrapperClasses: 'markdown-body',
      wrapperComponent: 'article-wrapper',
      frontmatterPreprocess(fm, options, id, defaultHeadProcess) {

        const mdContent = grayMatter.read(id);

        const processor = unified()
          .use(remarkParse).freeze();

        const ast = processor.parse(mdContent.content);

        const headings = ast.children.filter(x => x.type === 'heading').map(x => ({ depth: (x as any).depth, title: mdAstToString(x), children: [] as any[] }));

        for (let i = 0; i < headings.length; i++) {
          const heading = headings[i];
          if (heading.depth <= 1) continue;
          let j = i;
          while (j-- > 0) {
            const current = headings[j];
            if (current.depth < heading.depth) {
              current.children.push(heading);
              headings.splice(i, 1);
              i--;
              break;
            }
          }
        }

        const frontmatter = {
          title: 'default title',
          description: 'default description',
          ...fm,
          headings,
        }
        const meta: any[] = [
          { property: 'og:title', name: 'twitter:title', itemprop: 'title', content: frontmatter.title },
          {
            property: 'og:description',
            name: 'twitter:description',
            itemprop: 'description',
            content: frontmatter.description,
          },
        ]
        return {
          head: { ...frontmatter, meta },
          frontmatter: { ...frontmatter, meta },
        }
      }
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        {
          baseRoute: '',
          dir: 'src/pages'
        },
        {
          baseRoute: 'articles',
          dir: 'articles'
        }
      ]
    }),

    Inspect(),

    PluginResolveMd({}),
  ],
})

export default config
