import * as crypto from 'crypto'
import { env } from './env'

export function sign(header: object, payload: object) {
  const joined = `${JSON.stringify(header)}.${JSON.stringify(payload)}`
  const signature = createSignature(joined)
  return `${joined}.${signature}`
}

export function verify(token: string) {
  const [header, payload, signature] = token.split('.')
  const actual = createSignature(`${header}.${payload}`)

  if (signature === actual) return
  throw new Error(`Token invalid`)
}

function createSignature(text: string) {
  const signature = crypto.createHmac('sha256', env.secret).update(text).digest('hex')
  return signature
}
