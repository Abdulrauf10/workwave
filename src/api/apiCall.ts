import axios, { AxiosInstance } from "axios"

import { baseUrl } from "./endpoint"
import { Query } from "react-query"

export const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_HOST
  }
})

apiClient.interceptors.request.use(
  async (request) => {
    return request
  },
  function (error) {
    return Promise.reject(error)
  }
)

const apiCall = {
  get(resource: string, params?: any) {
    return apiClient.get(resource, params)
  },
  post(resource: string, params: any, config?: any) {
    return apiClient.post(resource, params, config)
  },
  put(resource: string, params: any, config?: any) {
    return apiClient.put(resource, params, config)
  },
  delete(resource: string) {
    return apiClient.delete(resource)
  }
}

export default apiCall
