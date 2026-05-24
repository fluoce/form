import type { Dispatch, SetStateAction } from "react"

export async function handleCopy({
  setCopied,
  text,
}: {
  text: string
  setCopied?: Dispatch<SetStateAction<boolean>>
}) {
  try {
    await navigator.clipboard.writeText(text)
    setCopied?.(true)
    setTimeout(() => {
      setCopied?.(false)
    }, 1200)
  } catch (err) {
    setCopied?.(false)
  }
}
