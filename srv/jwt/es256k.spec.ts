import * as crypto from 'crypto'
import { expect } from 'chai'
import { decode, create, verify } from '.'

const encoding = {
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
}

const leftPair = crypto.generateKeyPairSync('ec', { namedCurve: 'P-256', ...encoding })
const rightPair = crypto.generateKeyPairSync('ec', { namedCurve: 'P-256', ...encoding })

const left = {
  priv: (leftPair.privateKey as any) as string,
  pub: (leftPair.publicKey as any) as string,
}

const right = {
  priv: (rightPair.privateKey as any) as string,
  pub: (rightPair.publicKey as any) as string,
}

const header = { type: 'JWT', alg: 'ES256K' }
const testPayload = { userId: 'test', scope: 'all' }

describe('jwt::es256k', () => {
  it('will create a jwt', () => {
    const token = create(header.alg, testPayload, left.priv)
    const jwt = decode(token)
    expect(jwt.payload).to.include({ userId: 'test', scope: 'all' })
  })

  it('will verify a jwt', () => {
    const token = create(header.alg, testPayload, left.priv)
    expect(() => verify(token, left.pub)).to.not.throw()
  })

  it('will have equivalent header/payload parts when signed different', () => {
    const [leftHeader, leftPayload] = create(header.alg, testPayload, left.priv).split('.')
    const [rightHeader, rightPayload] = create(header.alg, testPayload, right.priv).split('.')

    expect(leftHeader).to.equal(rightHeader)
    expect(leftPayload).to.equal(rightPayload)
  })

  it('will throw when signed/verified with different secrets', () => {
    const token = create(header.alg, testPayload, left.priv)
    expect(() => verify(token, right.pub)).to.throw()
  })
})
