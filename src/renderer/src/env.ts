import { z } from 'zod'

const envSchema = z.object({
  API_URL: z.string().url(),

  GITHUB_CLIENT_ID: z.string(),
})

export const env = envSchema.parse(import.meta.env)
