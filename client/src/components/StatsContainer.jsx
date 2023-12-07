import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import StatItem from './StatItem';
import styles from './css/StatsContainer.module.css'

const StatsContainer = ({defaultStats}) => {
    const stats = [
        {
          title: 'pending applications',
          count: defaultStats?.pending || 0,
          icon: <FaSuitcaseRolling />,
          color: '#f59e0b',
          bcg: '#fef3c7',
        },
        {
          title: 'interviews scheduled',
          count: defaultStats?.interview || 0,
          icon: <FaCalendarCheck />,
          color: '#647acb',
          bcg: '#e0e8f9',
        },
        {
          title: 'jobs declined',
          count: defaultStats?.declined || 0,
          icon: <FaBug />,
          color: '#d66a6a',
          bcg: '#ffeeee',
        },
      ];
  return (
   <section className={styles['stats-container-section']}>
    {stats.map(item=>{
        return <StatItem key={item.title} {...item}/>
    })}
   </section>
  )
}
export default StatsContainer