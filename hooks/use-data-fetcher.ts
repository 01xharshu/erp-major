import { useState, useEffect } from "react"
import { useAuth } from "@/app/providers"
import { dataService } from "@/lib/data-service"

type DataType = "students" | "teachers" | "departments" | "courses" | "attendance" | "fees" | "announcements" | "assignments"

interface UseDataFetcherOptions {
  type: DataType
  filter?: Record<string, unknown>
  enabled?: boolean
}

export function useDataFetcher<T>({ type, filter, enabled = true }: UseDataFetcherOptions) {
  const { isDemo } = useAuth()
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchFn = dataService[type] as (isDemo?: boolean, filter?: Record<string, unknown>) => Promise<T[]>
        const result = await fetchFn(isDemo, filter)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data")
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, isDemo, filter, enabled])

  return { data, loading, error }
}
