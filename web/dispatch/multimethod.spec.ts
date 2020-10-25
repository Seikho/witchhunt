import { expect } from 'chai'
import { create } from './index'

type Nums = '1' | '2' | '3' | '4' | '5'

type Params = [Nums, number, Nums]

const { override, dispatch } = createTester()

function handler(left: string, mid: number, right: string) {
  return Number(left) + Number(right) - mid
}

describe('multimethods', () => {
  it('will throw when no overrides provided', () => {
    const mm = createTester()
    const fn = () => mm.dispatch('1', 1, '1')
    expect(fn).to.throw()
  })
  it('will return expected override', () => {
    override(['1', 1, '1'], handler)
    override(['2', 1, '1'], handler)
    const actual = dispatch('1', 1, '1')
    expect(actual).to.equal(1)
  })

  it('will throw ambiguous error', () => {
    const mm = createTester()
    mm.override(['1', 1, '1'], handler)
    mm.override(['1', 1, '1'], handler)
    mm.override(['2', 1, '1'], handler)
    const fn = () => mm.dispatch('1', 1, '1')
    const actual = mm.dispatch('2', 1, '1')
    expect(actual).to.equal(2)
    expect(fn).to.throw()
  })
})

function createTester() {
  return create<Params, any>(
    (l, r) => l === r,
    () => true,
    (l, r) => l === r
  )
}
