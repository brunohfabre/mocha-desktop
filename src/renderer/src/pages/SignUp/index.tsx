import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

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
import { Container, Content } from './styles'

const signUpFormSchema = z
  .object({
    name: z.string().min(1, 'required'),
    email: z.string().email(),
    password: z.string().min(1, 'required'),
    confirmPassword: z.string().min(1, 'required'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUp() {
  const theme = useThemeStore((state) => state.theme)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  const signIn = useAuthStore((state) => state.signIn)

  const { mutateAsync: handleSignUp, isLoading } = useMutation(
    async (data: SignUpFormData) => {
      const { name, email, password } = data

      const response = await api.post('/users', { name, email, password })

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
      />

      <Content>
        <Heading size="3xl" css={{ textAlign: 'center' }}>
          Sign up
        </Heading>

        <form onSubmit={handleSubmit(handleSignUp as any)}>
          <TextInput
            label="Name"
            placeholder="Name"
            {...register('name')}
            error={errors.name?.message}
            autoFocus
          />
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
          <PasswordInput
            label="Confirm password"
            placeholder="Confirm password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button isLoading={isLoading}>sign up</Button>
        </form>
      </Content>

      <Text size="sm" css={{ textAlign: 'center' }}>
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </Text>
    </Container>
  )
}
