"use client"

import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Skeleton,
  Text,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  InputGroup,
  InputLeftElement,
  Input,
  CircularProgress
} from "@chakra-ui/react"
import { JobListProvider, useJobListContext } from "@/context/JobListProvider"
import { useEffect, useState } from "react"
import Link from "next/link"
import { SearchIcon } from "@chakra-ui/icons"

export default function JobList() {
  const { dataJobs, filters, setFilters, loading } = useJobListContext()
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [selectTab, setSelectTab] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters({ ...filters, query: searchQuery, page: selectTab + 1 })
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, setFilters, filters, selectTab])

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value)
  }

  const handleTabChange = (index: number) => {
    setSelectTab(index)
  }

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    const options: any = { day: "numeric", month: "long", year: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const tabValue = [1, 2, 3, 4, 5]

  return (
    <>
      <Box p={"20px"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          padding={"15px"}
          boxShadow={"md"}
          borderBottom={"2px solid #EDF3F8"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
        >
          <InputGroup
            width={{ base: "100%", md: "90%" }}
            mb={{ base: "10px", md: "0" }}
          >
            {loading ? (
              <CircularProgress
                isIndeterminate
                size={"20px"}
                mt={"10px"}
                mr={"7px"}
              />
            ) : (
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
            )}

            <Input
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search by title or skill"
              backgroundColor={"#EDF3F8"}
            />
          </InputGroup>

          <Image
            src="/workwave.png"
            alt="workwave"
            width={"50px"}
            height={"50px"}
            mr={"25px"}
          />
        </Box>

        {dataJobs ? (
          <>
            <Box
              width={"49%"}
              bg={"#0C66C2"}
              display={"flex"}
              alignItems={"flex-start"}
              flexDir={"column"}
              justifyContent={"center"}
              padding={"5px"}
              mt={"10px"}
              mb={"10px"}
            >
              <Text
                ml={"10px"}
                fontSize={"18px"}
                color={"white"}
                fontWeight={500}
              >
                Top job Picks for you
              </Text>
              <Text color={"white"} ml={"10px"}>
                {dataJobs?.pages[0]?.data?.length
                  ? `${dataJobs?.pages[0]?.data?.length} result`
                  : "0 result"}
              </Text>
            </Box>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={6}
              boxShadow={"md"}
              pb={"7px"}
            >
              <GridItem maxH={"60vh"} overflow={"auto"}>
                {dataJobs?.pages?.map((comp: any) =>
                  comp?.data?.map((data: any, key: any) => (
                    <Box
                      key={key}
                      p={"10px"}
                      border={"1px solid #ccc"}
                      mb={"10px"}
                      cursor={"pointer"}
                      onClick={() => setSelectedJob(data)}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Skeleton isLoaded={!loading}>
                        <Image
                          src={data?.employer_logo || "/workwave.png"}
                          alt="employer"
                          height={35}
                          width={35}
                        />
                      </Skeleton>
                      <Skeleton isLoaded={!loading} ml={"12px"}>
                        <Text
                          color={"#0C66C2"}
                          fontSize={"15px"}
                          fontWeight={700}
                        >
                          {data?.job_title}
                        </Text>
                        <Text fontSize={"12px"} fontWeight={400}>
                          {data?.employer_name}
                        </Text>
                        <Text
                          color={"#666666"}
                          fontSize={"12px"}
                          fontWeight={400}
                        >
                          {data?.job_city || "(Remote)"},{" "}
                          {data?.job_country || ""}
                        </Text>
                      </Skeleton>
                    </Box>
                  ))
                )}
              </GridItem>

              <GridItem
                overflow={"auto"}
                maxH={"60vh"}
                mt={{ base: "10px", md: "-40px" }}
              >
                {selectedJob ? (
                  <Box p={"20px"} border={"1px solid #ccc"}>
                    <Image
                      src={selectedJob?.employer_logo || "/workwave.png"}
                      alt="employer"
                      height={25}
                      width={25}
                    />
                    <Text fontSize={"2xl"}>{selectedJob?.job_title}</Text>
                    <Text fontSize={"12px"} fontWeight={400}>
                      {selectedJob?.job_country} . posted:{" "}
                      {formatDate(selectedJob?.job_posted_at_datetime_utc) ||
                        "2 weeks ago"}
                    </Text>
                    <Link href={selectedJob.job_apply_link} target="_blank">
                      <Button
                        color={"white"}
                        bg={"#0C66C2"}
                        width={"150px"}
                        borderRadius={"20px"}
                        mb={"30px"}
                        mt={"15px"}
                      >
                        Apply
                      </Button>
                    </Link>
                    <Text mb={"10px"}>{selectedJob.job_description}</Text>
                  </Box>
                ) : (
                  <Box p={"20px"} border={"1px solid #ccc"}>
                    <Text>Please select a job to see the details</Text>
                  </Box>
                )}
              </GridItem>
            </Grid>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              mt={"25px"}
            >
              <Tabs
                variant="unstyled"
                index={selectTab}
                onChange={handleTabChange}
              >
                <TabList>
                  {tabValue.map((data, idx) => (
                    <Tab
                      key={idx}
                      _selected={{ color: "white", bg: "blue.500" }}
                      borderRadius={"7px"}
                    >
                      {data}
                    </Tab>
                  ))}
                </TabList>
              </Tabs>
            </Box>
          </>
        ) : (
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            marginTop={"200px"}
          >
            <Text>No job to display</Text>
          </Box>
        )}
      </Box>
    </>
  )
}
