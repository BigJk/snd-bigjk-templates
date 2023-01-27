import {
    defineConfig
} from 'vite'

import {
    viteSingleFile
} from "vite-plugin-singlefile"

const renameIndexPlugin = (newFilename) => {
    if (!newFilename) return
  
    return {
      name: 'renameIndex',
      enforce: 'post',
      generateBundle(options, bundle) {
        const indexHtml = bundle['index.html']
        indexHtml.fileName = newFilename
      },
    }
  }

export default defineConfig({
    plugins: [viteSingleFile(), renameIndexPlugin('print.html.njk')],
    build: {
        outDir: "./",
    }
})