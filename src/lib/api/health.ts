import { getJson } from '@/lib/api/client'

type Health = {
  status: 'ok'
  uptime: number
  timestamp: string
}

type DbHealth = { status: 'ok'; latencyMs: number } | { status: 'unreachable' }

export const fetchHealth = () => getJson<Health>('/health')

export const fetchDbHealth = () => getJson<DbHealth>('/db-health')
