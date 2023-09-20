import express from 'express'
import auth from '@src/app/services/auth'

const authRouter = express.Router()

authRouter.use(express.json())
authRouter.use(express.urlencoded({ extended: true }))

authRouter.post('/register', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const member = await auth.registerMember({
      firstName,
      lastName,
      email,
      password,
    })

    res.send(member)
  } catch (error) {
    next(error)
  }
})

authRouter.post('/authenticate', async (req, res, next) => {
  const { email, password } = req.body

  try {
    const token = await auth.authenticate({
      email,
      password,
    })

    res.send(token)
  } catch (error) {
    next(error)
  }
})

export default authRouter
