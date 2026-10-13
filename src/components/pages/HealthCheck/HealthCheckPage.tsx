import { useQuery } from '@tanstack/react-query'

import ConnectionCheck from '@/components/pages/HealthCheck/ConnectionCheck'
import { healthCheckTexts } from '@/data/healthCheck'
import { fetchDbHealth, fetchHealth } from '@/lib/api/health'
import { queryKeys } from '@/lib/api/queryKeys'

export default function HealthCheckPage() {
  const server = useQuery({ queryKey: queryKeys.health, queryFn: fetchHealth, enabled: false, retry: false })
  const database = useQuery({ queryKey: queryKeys.dbHealth, queryFn: fetchDbHealth, enabled: false, retry: false })

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 p-8">
      <h1 className="text-xl font-semibold">{healthCheckTexts.title}</h1>

      <ConnectionCheck
        label={healthCheckTexts.server.label}
        isFetching={server.isFetching}
        result={
          server.isError
            ? { isOk: false, message: healthCheckTexts.networkError }
            : server.data && { isOk: true, message: healthCheckTexts.server.ok }
        }
        onCheck={() => server.refetch()}
      />

      <ConnectionCheck
        label={healthCheckTexts.database.label}
        isFetching={database.isFetching}
        result={
          database.isError
            ? { isOk: false, message: healthCheckTexts.networkError }
            : database.data && {
                isOk: database.data.status === 'ok',
                message:
                  database.data.status === 'ok'
                    ? healthCheckTexts.database.ok
                    : healthCheckTexts.database.unreachable,
              }
        }
        onCheck={() => database.refetch()}
      />
    </main>
  )
}
