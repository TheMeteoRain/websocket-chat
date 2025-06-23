import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = () => {
  // @ts-expect-error: TODO
  return (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization

    try {
      // @ts-expect-error: TODO
      jwt.verify(authToken, process.env.JWT_SECRET)
    } catch (error) {
      console.log(error)
      return res.status(404).send({
        error: {
          code: 'invalid_token',
        },
      })
    }

    next()
  }
}

export default authMiddleware
