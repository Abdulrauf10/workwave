import apiCall from "./apiCall"
import { JOB_LIST, baseUrl } from "./endpoint"

export const getJob = async (filters: any) => {
  const res = await apiCall.get(`${JOB_LIST}?`, {
    params: filters
  })
  return res.data
}
