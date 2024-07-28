"use client"
import Image from "next/image"
import styles from "./page.module.css"
import { Box, Text } from "@chakra-ui/react"
import { JobListProvider, useJobListContext } from "@/context/JobListProvider"
import JobList from "@/features/JobList"

export default function Home() {
  const { dataJobs, filters, setFilters } = useJobListContext()

  return (
    <>
      <JobListProvider>
        <JobList />
      </JobListProvider>
    </>
  )
}
