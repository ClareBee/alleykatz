export const setBaseHeaders = (): Headers => {
  const requestHeaders: HeadersInit = new Headers();
  const key = process.env.NEXT_PUBLIC_API_KEY;
  if (!key) {
    console.log('Missing credentials');
    return requestHeaders;
  }
  requestHeaders.set('x-api-key', key);
  return requestHeaders;
}