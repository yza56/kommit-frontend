import type { ApiError } from '@/types/apiContract'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export class ApiRequestError extends Error {
  readonly apiError: ApiError

  constructor(apiError: ApiError) {
    super(apiError.message)
    this.apiError = apiError
  }
}

export async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`)

  return response.json() as Promise<T>
}

const UNREACHABLE_ERROR: ApiError = {
  code: 'INTERNAL_ERROR',
  message: 'Une erreur est survenue, réessaie dans un instant',
}

export async function requestWithSession<T>(path: string, body?: unknown): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      credentials: 'include',
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiRequestError(UNREACHABLE_ERROR)
  }

  if (!response.ok) {
    const apiError = await response.json().catch(() => UNREACHABLE_ERROR)

    throw new ApiRequestError(apiError as ApiError)
  }

  return response.json() as Promise<T>
}
