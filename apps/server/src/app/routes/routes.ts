import { Express } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express'
import auth from './auth'

const router = (app: Express) => {
  app.use(auth)

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error)
    }

    console.error(req.method, req.url, error)
    res.status(500).json({ error })
  })
}

export default router
