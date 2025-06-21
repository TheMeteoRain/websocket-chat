import { faker } from '@faker-js/faker'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import LockIcon from '@mui/icons-material/Lock'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, NavLink, redirect, useNavigate } from 'react-router'

import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import type { PaperProps } from '@mui/material/Paper'
import type { AvatarProps } from '@mui/material/Avatar'
import type { ButtonProps } from '@mui/material/Button'
import { useAuth } from '../../hooks/useAuth'

const StyledPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}))

const StyledAvatar = styled(Avatar)<AvatarProps>(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}))

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}))

const StyledSubmitButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}))

export interface SignUpFormState {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface SignUpProps {}

const signUpFormDefaultValues = (): SignUpFormState => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password({ length: 15 }),
  }
}

export const SignUp: React.FC<SignUpProps> = (props) => {
  const { register, authenticate } = useAuth({ fetchCurrentMember: false })
  const navigate = useNavigate()

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SignUpFormState>({
    defaultValues: signUpFormDefaultValues(),
  })

  const onSubmit = async (data: SignUpFormState) => {
    const result = await register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    console.log('Registration result:', result)
    if (result?.errors) {
      console.error('Registration failed:', result.errors)
      return
    }

    navigate('/channel')
  }

  return (
    <Container
      component='main'
      maxWidth='xs'
      style={{
        height: '100vh',
        alignContent: 'center',
        justifyItems: 'center',
      }}
    >
      <StyledPaper>
        <StyledAvatar>
          <LockIcon />
        </StyledAvatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <TextField
                    autoComplete='fname'
                    variant='outlined'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    autoComplete='lname'
                    {...field}
                  />
                )}
              />
            </Grid>
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
            Sign Up
          </StyledSubmitButton>
          <Grid container justifyContent='flex-end'>
            <Grid>
              <NavLink to='/'>Already have an account? Sign in</NavLink>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </Container>
  )
}

export default SignUp
