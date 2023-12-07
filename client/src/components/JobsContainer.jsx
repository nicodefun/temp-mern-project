import { useAllJobsContext } from '../pages/AllJobs'
import styles from './css/JobsContainer.module.css'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'

const Jobscontainer = () => {
  const {data} = useAllJobsContext()
  // console.log(data);
  const {jobs, numOfPages, totalJobs} = data;
  if(jobs.length === 0){
   return <section className={styles['jobs-section']}>
        <h2>No jobs to display...</h2>
    </section>
  }
  return <section className={styles['jobs-section']}>
    <h5>{totalJobs} job{totalJobs>1 && 's'} found</h5>
       <div className={styles.jobs}>
        {jobs.map(job=>{
            return <Job key={job._id} {...job}/>
        })}
       </div>
       {numOfPages >1 && <PageBtnContainer/>}
    </section>
}
export default Jobscontainer