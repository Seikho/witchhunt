type Comparator<T> = (input: T, fromSet: T) => boolean

type Compare<T extends unknown[]> = { [P in keyof T]: Comparator<T[P]> }

export type Options<T extends unknown[], TReturn> = {
  /**
   * Throw if there is an ambiguous match
   * Defaults to true
   */
  throwAmibigous?: boolean

  /**
   * Only allow exact matches. Otherwise throw.
   * Defaults to false
   */
  exactOnly?: boolean

  fallback?: (...args: T) => TReturn
}

export function create<T extends unknown[], TReturn = void>(opts: Options<T, TReturn>, ...comparators: Compare<T>) {
  type Func = (...args: T) => TReturn

  const sets = Array.from({ length: comparators.length }, () => new Set<any>())
  const overrides: Array<[T, Func]> = []

  const dispatch = (...args: T): TReturn | MultimethodError => {
    const handler = getHandler(args, comparators, overrides)
    if (handler instanceof Error) {
      if (opts.throwAmibigous === true || opts.throwAmibigous === undefined) {
        throw handler
      }

      return handler
    }

    if (handler.func === null) {
      if (opts.fallback) {
        return opts.fallback(...args)
      }
      throw new NoHandlerError(`No overrides have been registered`)
    }

    if (handler.matches < comparators.length) {
      if (opts.exactOnly) {
        throw new NoExactMatchError(`No exact match found for dispatch`)
      }
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
  const compare = (arg: any, i: number) => comps[i](args[i], arg)

  let max = -1
  let matches = 0
  let func: any = null

  for (const override of overrides) {
    const count = override[0].map(compare).reduce(toMatches, 0)
    if (count < max) continue
    if (count === max) {
      matches++
      continue
    }
    matches = 0
    max = count
    func = override[1]
  }

  if (matches > 0) return new AmbiguousError(`Ambiguous dispatch`)

  return { func, matches: max }
}

function toMatches(prev: number, curr: boolean) {
  return curr ? prev + 1 : prev
}

export class MultimethodError extends Error {}

export class AmbiguousError extends MultimethodError {}
export class NoExactMatchError extends MultimethodError {}
export class NoHandlerError extends MultimethodError {}
