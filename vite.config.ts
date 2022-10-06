import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Layouts from 'vite-plugin-vue-layouts'
import Markdown from 'vite-plugin-vue-markdown'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import PluginResolveMd from './plugins/vite-plugin-resolve-md'
import MarkdownItPrism from 'markdown-it-prism';

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
      },
      // Class names for the wrapper div
      wrapperClasses: 'markdown-body',
      wrapperComponent: 'article-wrapper'
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
