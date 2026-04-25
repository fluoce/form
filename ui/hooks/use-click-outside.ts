import { type RefObject, useEffect } from "react"

type UseClickOutsideProps = {
  refs: RefObject<HTMLElement | null | undefined>[]
  callback: () => void
}

export function useClickOutside({ refs, callback }: UseClickOutsideProps) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const isInside = refs.some((ref) => {
        return ref.current && ref.current.contains(event.target as Node)
      })

      if (!isInside) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [refs, callback])
}
