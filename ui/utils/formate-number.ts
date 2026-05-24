export function formatNumber(value: number): string {
  if (typeof value !== "number" || isNaN(value)) return "0"

  if (value < 1000) {
    return value.toString()
  }

  if (value < 10000) {
    return value.toLocaleString()
  }

  if (value < 1000000) {
    const formatted = value / 1000

    return `${Number.isInteger(formatted) ? formatted : formatted.toFixed(1)}k`
  }

  const formatted = value / 1000000

  return `${Number.isInteger(formatted) ? formatted : formatted.toFixed(2)}M`
}
