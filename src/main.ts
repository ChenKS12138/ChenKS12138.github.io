import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import 'uno.css'
import './styles/main.css'
import './styles/github-markdown.css'
import './styles/prism-github.css';


const routes = setupLayouts(generatedRoutes)


export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => (i as any).install?.(ctx))
  },
)
