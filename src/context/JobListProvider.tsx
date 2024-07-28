"use client"

import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
  useContext
} from "react"
import { getJob } from "@/api/job"
import { InfiniteData, useInfiniteQuery } from "react-query"

type IContext = {
  dataJobs: any
  filters: any
  setFilters: (data?: any) => void
  loading: boolean
}

const initialContext: IContext = {
  dataJobs: [],
  filters: {
    query: "",
    page: null,
    employment_types: "FULLTIME"
  },
  setFilters: (data: any) => {},
  loading: false
}

const Context = createContext<IContext>(initialContext)

export const useJobListContext = () => useContext(Context)

export const JobListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState(initialContext.filters)

  const { data: dataJobs, isFetching: loading } = useInfiniteQuery(
    ["job-list", filters],
    ({ queryKey }) => getJob(queryKey[1]),

    {
      enabled: !!filters?.query,
      cacheTime: 0,
      retry: (failureCount, error) => {
        const customError = error as any
        const maxRetries = 3
        return failureCount <= maxRetries && customError?.status === 500
      }
    }
  )

  const values = {
    dataJobs,
    filters,
    setFilters,
    loading
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}
