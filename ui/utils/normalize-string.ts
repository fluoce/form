export function normalizeString(input: string, idx?: number): string {
  if (!input) return `Option ${idx || ""}`
  return input.trim().toLowerCase().replace(/\s+/g, "-")
}
