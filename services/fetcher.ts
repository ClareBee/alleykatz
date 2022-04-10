import { setBaseHeaders } from "../utils/headers";

const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);

export const fetcher = (url: string) => fetch(url, {
  headers: requestHeaders,
}).then(r => r.json()).catch(e => console.log(e))