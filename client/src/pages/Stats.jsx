import StatsContainer from "../components/StatsContainer";
import ChartsContainer from "../components/ChartsContainer";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import ErrorElement from "../components/ErrorElement";

const statsQuery = {
  queryKey: ["stat"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/stat");
    return response.data; //axio
  }, //promise
};

export const loader = (queryClient) => async()=>{ // function in a function
  const data = await queryClient.ensureQueryData(statsQuery); 
  return null;
}

// export const loader = async (queryClient) => {
//   try {
//     const { data } = await customFetch.get("/jobs/stats");
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

const Stats = () => {
  const { data } = useQuery(statsQuery);
  // if(isLoading){
  //  return  <Loading/>
  // }
  // if(isError) return <ErrorElement/>
  const { defaultStats, monthlyApplications } = data;
  // const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
