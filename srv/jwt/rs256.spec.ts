import * as crypto from 'crypto'
import { expect } from 'chai'
import { decode, create, verify } from '.'

const leftPair = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })
const rightPair = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })

const expo = { type: 'pkcs1', format: 'pem' } as const

const left = {
  priv: leftPair.privateKey.export(expo).toString(),
  pub: leftPair.publicKey.export(expo).toString(),
}

const right = {
  priv: rightPair.privateKey.export(expo).toString(),
  pub: rightPair.publicKey.export(expo).toString(),
}

const header = { type: 'JWT', alg: 'RS256' }
const testPayload = { userId: 'test', scope: 'all' }

describe('jwt::rs256', () => {
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
