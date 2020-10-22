import * as es256k from './es256k'
import * as rs256 from './rs256'
import * as hs256 from './hs256'
import * as none from './none'
import { encode, fromBase64, toBase64 } from './util'

type Header = {
  type: string
  alg: string
}

type Algorithm = {
  sign: (text: string, secert: string) => string
  verify: (token: string, secret: string) => void
}

const algs: { [alg: string]: Algorithm } = {
  es256k,
  rs256,
  hs256,
  none,
}

export function verify<T = any>(token: string, key: string) {
  const [header64, payload64] = token.split('.')
  const header: Header = JSON.parse(fromBase64(header64))
  const payload = JSON.parse(fromBase64(payload64)) as T

  const algorithm = header.alg.toLowerCase()
  const api = algs[algorithm]

  if (!api) throw new Error(`Unrecognised algorithm "${header.alg}"`)

  api.verify(token, key)

  return {
    header,
    payload,
  }
}

export function create(algorithm: string, payload: object, key: string) {
  const alg = algs[algorithm.toLowerCase()]
  if (!alg) throw new Error(`Unrecognised algorithm "${algorithm}"`)

  const header = { type: 'JWT', alg: algorithm.toUpperCase() }
  const header64 = toBase64(JSON.stringify(header))
  const payload64 = toBase64(JSON.stringify(payload))
  const base64 = `${header64}.${payload64}`
  const signature = alg.sign(encode(base64), key)

  return `${base64}.${signature}`
}

export function decode<T = any>(token: string) {
  const [header64, payload64, signature] = token.split('.')
  const header: Header = JSON.parse(fromBase64(header64))
  const payload = JSON.parse(fromBase64(payload64)) as T

  return { header, payload, signature }
}
