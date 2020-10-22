import { createHash } from 'crypto'

export function encode(text: string) {
  return createHash('sha256').update(text).digest().toString()
}

export function toBase64(text: string) {
  return Buffer.from(text).toString('base64')
}

export function fromBase64(text: string) {
  return Buffer.from(text, 'base64').toString()
}
