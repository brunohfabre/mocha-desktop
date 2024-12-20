import { z } from 'zod'

const envSchema = z.object({
  RENDERER_VITE_API_URL: z.string().url(),

  RENDERER_VITE_GITHUB_CLIENT_ID: z.string(),
})

export const env = envSchema.parse(import.meta.env)
