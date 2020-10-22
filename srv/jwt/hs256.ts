import { createHmac } from 'crypto'
import { encode } from './util'

export function verify(token: string, secret: string) {
  const [header, payload, signature] = token.split('.')
  const compare = sign(encode(`${header}.${payload}`), secret)

  if (signature !== compare) throw new Error(`Token has invalid signature`)
}

export function sign(text: string, secret: string) {
  const signature = createHmac('sha256', secret).update(text).digest().toString()
  return signature
}
