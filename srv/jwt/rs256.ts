import { createSign, createVerify } from 'crypto'
import { encode } from './util'

export function verify(token: string, publicKey: string) {
  const [header64, payload64, signature] = token.split('.')
  const hash = encode(`${header64}.${payload64}`)
  const verifier = createVerify('sha256')
  verifier.write(hash)
  verifier.end()
  const isValid = verifier.verify(publicKey, signature, 'base64')
  if (!isValid) throw new Error(`Token has invalid signature`)
}

export function sign(text: string, privateKey: string) {
  const signer = createSign('sha256')
  signer.write(text)
  signer.end()
  const signature = signer.sign(privateKey, 'base64')
  return signature
}
