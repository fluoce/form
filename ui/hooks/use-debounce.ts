import { useEffect, useMemo, useRef } from "react"

import debounce from "lodash.debounce"

type DebounceOptions = {
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

type ControlFunctions = {
  cancel: () => void
  flush: () => void
  isPending: () => boolean
}

export type DebouncedState<T extends (...args: any) => ReturnType<T>> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) &
  ControlFunctions

export function useDebounceCallback<T extends (...args: any) => ReturnType<T>>(
  func: T,
  delay = 500,
  options?: DebounceOptions
): DebouncedState<T> {
  const debouncedFunc = useRef<ReturnType<typeof debounce> | null>(null)
  const debounced = useMemo(() => {
    const debouncedFuncInstance = debounce(func, delay, options)
    debouncedFunc.current = debouncedFuncInstance
    const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) => {
      return debouncedFunc.current!(...args)
    }
    wrappedFunc.cancel = () => {
      debouncedFunc.current?.cancel()
    }
    wrappedFunc.isPending = () => {
      return false
    }
    wrappedFunc.flush = () => {
      return debouncedFunc.current?.flush()
    }
    return wrappedFunc
  }, [func, delay, options])

  useEffect(() => {
    debouncedFunc.current = debounce(func, delay, options)
    return () => {
      debouncedFunc.current?.cancel()
    }
  }, [func, delay, options])

  return debounced
}
