export const setBaseHeaders = (key: string | undefined): Headers => {
  const requestHeaders: HeadersInit = new Headers();
  if (!key) {
    console.log('Missing credentials');
    return requestHeaders;
  }
  requestHeaders.set('x-api-key', key);
  return requestHeaders;
}