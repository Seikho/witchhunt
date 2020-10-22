import { create } from 'svcready'
import * as session from 'express-session'
import { env } from './env'

export const {
  app,
  server,
  sockets,
  start,
  stop,
  validateToken,
  onConnect,
  onMsg,
  sendMsg,
} = create({
  port: 3000,
  sockets: true,
})

app.use(
  session({
    secret: env.secret,
    cookie: {
      httpOnly: true,
      signed: true,
    },
  })
)
