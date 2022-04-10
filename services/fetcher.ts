
export const fetcher = (url: string) => fetch(url).then(r => r.json()).catch(e => console.log(e))