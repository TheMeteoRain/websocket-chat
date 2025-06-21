import Container, { type ContainerProps } from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'
import Button, { type ButtonProps } from '@mui/material/Button'
import type { PaperProps } from '@mui/material/Paper'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useAuth } from '../../hooks/useAuth'

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}))

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}))

const StyledSubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}))
const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  height: '100vh',
  alignContent: 'center',
  justifyItems: 'center',
}))

const Logo = styled('img')(({ theme }) => ({
  marginTop: '-200px',
  width: '200px',
}))

export interface LoginFormState {
  email: string
  password: string
}

export interface LoginProps {}

export const Login: React.FC<LoginProps> = (props) => {
  const { register, authenticate } = useAuth({ fetchCurrentMember: false })
  const navigate = useNavigate()

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<LoginFormState>()

  const onSubmit = async (data: LoginFormState) => {
    const result = await authenticate({
      variables: {
        email: data.email,
        password: data.password,
      },
    })

    if (result?.error) {
      console.error('Authentication failed:', result.error)
      return
    }
    console.log('Authentication successful:', result.data)

    navigate('/channel')
  }

  return (
    <StyledContainer component='main' maxWidth='xs'>
      <StyledPaper>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    autoComplete='email'
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <StyledSubmitButton
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
          >
            Login
          </StyledSubmitButton>
          <Grid container justifyContent='flex-end'>
            <Grid>
              <NavLink to='/register'>Don't have an account? Sign up</NavLink>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  )
}

export default Login
