/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly RENDERER_VITE_API_URL: string
  readonly RENDERER_VITE_GITHUB_CLIENT_ID: string
  // more env variables...
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
