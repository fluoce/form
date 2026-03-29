import { generateKeyBetween } from 'fractional-indexing';

export function createFractionalIndex(
  before?: string | null,
  after?: string | null,
): string {
  return generateKeyBetween(before ?? null, after ?? null);
}
