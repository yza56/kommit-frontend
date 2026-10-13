import { getJson } from '@/lib/api/client'
import type { DbHealth, Health } from '@/types/apiContract'

export const fetchHealth = () => getJson<Health>('/health')

export const fetchDbHealth = () => getJson<DbHealth>('/db-health')
