import { QueryClientProvider } from '@tanstack/react-query'

import HealthCheckPage from '@/components/pages/HealthCheck/HealthCheckPage'
import { queryClient } from '@/lib/queryClient'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HealthCheckPage />
    </QueryClientProvider>
  )
}
