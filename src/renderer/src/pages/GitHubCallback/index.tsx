import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import axios from 'axios'

import { GitHubIcon } from '../../assets/icons/GitHubIcon'
import { Text } from '../../components/Text'
import { api } from '../../lib/api'
import { useAuthStore } from '../../stores/authStore'
import { Container, GitHubIconContainer } from './styles'

type GitHubUser = {
  id: number
  name: string
  email: string
  bio: string
  avatar_url: string
}

export function GitHubCallback() {
  const [searchParams] = useSearchParams()

  const signIn = useAuthStore((state) => state.signIn)

  useEffect(() => {
    async function getGitHubAccessToken() {
      try {
        const accessTokenResponse = await axios.get(
          'https://github.com/login/oauth/access_token',
          {
            params: {
              code: searchParams.get('code'),
              client_id: import.meta.env.RENDERER_VITE_GITHUB_CLIENT_ID,
              client_secret: import.meta.env.RENDERER_VITE_GITHUB_CLIENT_SECRET,
            },
            headers: {
              Accept: 'application/json',
            },
          },
        )

        const githubUserResponse = await axios.get<GitHubUser>(
          'https://api.github.com/user',
          {
            headers: {
              Authorization: `Bearer ${accessTokenResponse.data.access_token}`,
            },
          },
        )

        const { id, name, email, bio, avatar_url } = githubUserResponse.data

        const user = {
          githubId: id,
          name,
          email,
          bio,
          avatarUrl: avatar_url,
        }

        const response = await api.post('/users', user)

        signIn(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    if (searchParams.get('code')) {
      getGitHubAccessToken()
    }
  }, [searchParams])

  return (
    <Container>
      <GitHubIconContainer>
        <GitHubIcon />
      </GitHubIconContainer>

      <Text size="sm">Loading GitHub info...</Text>
    </Container>
  )
}
