import { createSign, createVerify } from 'crypto'
import { encode } from './util'

export function verify(token: string, secret: string) {
  const [header, payload, signature] = token.split('.')

  const verifier = createVerify('sha256')
  verifier.write(encode(`${header}.${payload}`))
  verifier.end()
  const isVerified = verifier.verify(secret, signature, 'base64')

  if (!isVerified) throw new Error(`Token has invalid signature`)
}

export function sign(text: string, secret: string) {
  const signer = createSign('sha256')
  signer.write(text)
  signer.end()
  const signature = signer.sign(secret, 'base64')
  return signature
}
