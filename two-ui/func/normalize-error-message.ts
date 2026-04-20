export function normalizeErrorMessage(
  message: unknown,
  fallback = "Something went wrong, try again.",
): string {
  if (typeof message === "string") {
    return message;
  }
  if (Array.isArray(message)) {
    return typeof message[0] === "string" ? message[0] : fallback;
  }
  return fallback;
}
