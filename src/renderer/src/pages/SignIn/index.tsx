import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { GitHubIcon } from '../../assets/icons/GitHubIcon'
import LogoDarkImage from '../../assets/images/logo-dark.svg'
import LogoLightImage from '../../assets/images/logo-light.svg'
import { Button } from '../../components/Button'
import { Heading } from '../../components/Heading'
import { PasswordInput } from '../../components/PasswordInput'
import { Text } from '../../components/Text'
import { TextInput } from '../../components/TextInput'
import { api } from '../../lib/api'
import { useAuthStore } from '../../stores/authStore'
import { useThemeStore } from '../../stores/themeStore'
import { Container, Content, OrText } from './styles'

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'required'),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignIn() {
  const navigate = useNavigate()

  const { theme, toggleTheme } = useThemeStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  const signIn = useAuthStore((state) => state.signIn)

  useEffect(() => {
    window.api.on('callback', (_: any, message: any) => {
      const { url } = message

      navigate(url.replace('mocha:/', ''))
    })
  }, [navigate])

  const { mutateAsync: handleSignIn, isLoading } = useMutation(
    async (data: SignInFormData) => {
      const { email, password } = data

      const response = await api.post('/sessions', { email, password })

      return response.data
    },
    {
      onSuccess: (data) => {
        const { user, token } = data

        signIn({ user, token })
      },
    },
  )

  return (
    <Container>
      <img
        src={theme === 'light' ? LogoLightImage : LogoDarkImage}
        alt="Mocha logo"
        onClick={toggleTheme}
      />

      <Content>
        <Heading size="3xl" css={{ textAlign: 'center' }}>
          Sign in
        </Heading>

        <form onSubmit={handleSubmit(handleSignIn as any)}>
          <TextInput
            label="Email"
            placeholder="Email"
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button type="submit" isLoading={isLoading}>
            Sign in
          </Button>
        </form>

        <OrText size="xs">or</OrText>

        <Button
          variant="secondary"
          onClick={() =>
            window.api.openExternalUrl(
              'https://github.com/login/oauth/authorize?client_id=a1f01505996889ca1557&scope=read%3Auser',
            )
          }
        >
          <GitHubIcon />
          GitHub
        </Button>
      </Content>

      <Text size="sm" css={{ textAlign: 'center' }}>
        Don&apos;t have account? <Link to="/sign-up">Sign up</Link>
      </Text>
    </Container>
  )
}
