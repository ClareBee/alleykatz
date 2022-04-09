import { setBaseHeaders } from "../utils/headers";

const requestHeaders = setBaseHeaders();

export const fetcher = (url: string) => fetch(url, {
  headers: requestHeaders,
}).then(r => r.json()).catch(e => console.log(e))