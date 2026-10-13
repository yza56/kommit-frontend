import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/queryClient'

export default function App() {
  return <QueryClientProvider client={queryClient}></QueryClientProvider>
}
