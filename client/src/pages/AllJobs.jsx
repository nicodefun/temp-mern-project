import { toast } from "react-toastify";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import customFetch from "../utils/customFetch";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    // console.log(request.url)
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
    // console.log(params)
    // try {
    //   const { data } = await customFetch.get("/jobs", {
    //     params
    //   });
    //   return { data,searchValues:{...params} };
    // } catch (err) {
    //   toast.error(err?.response?.data?.msg);
    //   return err;
    // }
  };

const AllJobContext = createContext({
  data: {},
  searchValues: {},
});

const AllJobs = () => {
  // const { data, searchValues } = useLoaderData();
  const { searchValues } = useLoaderData();
  // // console.log(data);
  const { data } = useQuery(allJobsQuery(searchValues));
  return (
    <AllJobContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobContext);
export default AllJobs;
