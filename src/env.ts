import * as z from 'zod'

const envSchema = z.object({
  VITE_APP_API_URL: z.url(),
  VITE_APP_GITHUB_CLIENT_ID: z.string(),
})

export const env = envSchema.parse(import.meta.env)
