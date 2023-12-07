import { toast } from "react-toastify";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import customFetch from "../utils/customFetch";
import { useLoaderData, useSubmit } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({request}) => {
  // console.log(request.url)
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  // console.log(params)
  try {
    const { data } = await customFetch.get("/jobs", {
      params
    });
    return { data,searchValues:{...params} };
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    return err;
  }
};

const AllJobContext= createContext({
  data: {},
  searchValues:{}
});

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  // console.log(data);
  return (
    <AllJobContext.Provider value={{data, searchValues}}>
      <SearchContainer />
      <JobsContainer />
    </AllJobContext.Provider>
  );
};

export const useAllJobsContext = ()=>useContext(AllJobContext);
export default AllJobs;
