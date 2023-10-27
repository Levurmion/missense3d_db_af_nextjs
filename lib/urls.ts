export function useHostURL () {
    const hostname = process.env.HOST_URL
    const port = process.env.HOST_PORT
    return `${hostname}`
}

export function useDBURL () {
    const dbURL = process.env.DB_URL
    const dbPort = process.env.DB_PORT
    return `${dbURL}:${dbPort}`
}