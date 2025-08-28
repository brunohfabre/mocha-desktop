import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig(() => {
  return {
    root: '.',
    input: {
      path: 'http://localhost:3333/docs/json',
    },
    output: {
      clean: true,
      path: './src/http/generated',
    },
    plugins: [
      pluginOas(),
      pluginTs(),
      pluginReactQuery({
        client: {
          baseURL: 'http://localhost:3333',
        },
      }),
    ],
  }
})
