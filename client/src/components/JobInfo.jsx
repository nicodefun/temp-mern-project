import styles from './css/JobInfo.module.css'

const JobInfo = ({icon, text}) => {
  return (
    <div className={styles['job-info']}>
        <span className={styles['job-icon']}>{icon}</span>
        <span className={styles['job-text']}>{text}</span>
    </div>
  )
}
export default JobInfo