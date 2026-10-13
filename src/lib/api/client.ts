const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`)

  return response.json() as Promise<T>
}
