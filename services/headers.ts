export const setBaseHeaders = (): Headers => {
  const requestHeaders: HeadersInit = new Headers();
  const key = process.env.NEXT_PUBLIC_API_KEY;
  console.log('key', key)
  if (!key) {
    throw new Error('Missing credentials');
  }
  requestHeaders.set('x-api-key', key);
  return requestHeaders;
}