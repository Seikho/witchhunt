import { expect } from 'chai'
import { decode, create, verify } from './'

const header = { type: 'JWT', alg: 'HS256' }
const testPayload = { userId: 'test', scope: 'all' }
const secret = 'secret'

describe('jwt::hs256', () => {
  it('will create a jwt', () => {
    const token = create(header.alg, testPayload, secret)
    const jwt = decode(token)
    expect(jwt.payload).to.include({ userId: 'test', scope: 'all' })
  })

  it('will verify a jwt', () => {
    const token = create(header.alg, testPayload, secret)
    expect(() => verify(token, secret)).to.not.throw()
  })

  it('will have equivalent header/payload parts when signed different', () => {
    const [leftHeader, leftPayload] = create(header.alg, testPayload, 'left').split('.')
    const [rightHeader, rightPayload] = create(header.alg, testPayload, 'right').split('.')

    expect(leftHeader).to.equal(rightHeader)
    expect(leftPayload).to.equal(rightPayload)
  })

  it('will throw when signed/verified with different secrets', () => {
    const token = create(header.alg, testPayload, 'good')
    expect(() => verify(token, 'bad')).to.throw()
  })
})
