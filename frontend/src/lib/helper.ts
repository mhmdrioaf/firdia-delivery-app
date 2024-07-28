export function capitalize(T: string): string {
  const firstWord = T.charAt(0).toUpperCase();
  return firstWord + T.slice(1, T.length);
}
