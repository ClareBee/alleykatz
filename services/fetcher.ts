import { setBaseHeaders } from "./headers";

const requestHeaders = setBaseHeaders();

export const fetcher = (url: string) => fetch(url, {
  headers: requestHeaders,
}).then(r => r.json())