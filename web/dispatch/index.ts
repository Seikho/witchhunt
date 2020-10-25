type First<T extends unknown[]> = T extends [...infer U, infer _] ? U : unknown
type Last<T extends unknown[]> = T extends [...infer _, infer U] ? U : unknown

type Comparator<T> = (input: T, fromSet: T) => boolean

type Compare<T extends unknown[]> = { [P in keyof T]: Comparator<T[P]> }

export function create<T extends unknown[], TReturn>(...comparators: Compare<T>) {
  type Func = (...args: T) => TReturn

  const sets = Array.from({ length: comparators.length }, () => new Set<any>())
  const overrides: Array<[T, Func]> = []

  const dispatch = (...args: T): TReturn => {
    const handler = getHandler(args, comparators, overrides)
    if (handler instanceof Error) {
      // TODO: Check options for "throw on ambigious"
      throw handler
    }

    if (handler.func === null) {
      // TODO: Check options for "throw on no handler"
      // There may be a "default handler" that we can return
      throw new Error(`No overrides have been registered`)
    }

    if (handler.matches < comparators.length) {
      // TODO: Check options for "exact match only"
    }

    return handler.func(...args)
  }

  const override = (args: T, handler: Func): void => {
    let i = 0
    for (const arg of args) {
      sets[i++].add(arg)
    }
    overrides.push([args, handler])
  }

  return {
    dispatch,
    override,
  }
}

function getHandler<T extends unknown[]>(args: T, comps: Compare<T>, overrides: Array<[T, any]>) {
  const matches: number[] = []
  const compare = (arg: any, i: number) => comps[i](args[i], arg)

  let max = -1
  let func: any = null

  for (const override of overrides) {
    const count = override[0].map(compare).reduce(toMatches, 0)
    matches.push(count)
    if (count === max || count < max) continue
    max = count
    func = override[1]
  }

  const ambiguous = matches.filter((m) => m === max)
  if (ambiguous.length > 1) return new Error(`Ambiguous`)

  return { func, matches: max }
}

function toMatches(prev: number, curr: boolean) {
  return curr ? prev + 1 : prev
}

function sortDesc(l: number, r: number) {
  return l === r ? 0 : l > r ? -1 : 1
}
