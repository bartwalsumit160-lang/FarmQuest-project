export function getAsset(path: string) {
  // Use NEXT_PUBLIC_BASE_PATH when deploying to a subpath (e.g., GitHub Pages).
  // Locally or when not set, this will be an empty string.
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${prefix}${path}`;
}
