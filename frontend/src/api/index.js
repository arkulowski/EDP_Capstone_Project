async function getJSON(path) {
    const res = await fetch(path)
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
        return res.json()
}


export function pingServer(){
    return getJSON('/api/ping')
}

