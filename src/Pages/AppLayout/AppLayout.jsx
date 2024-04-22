import Sidebar from '../../Components/Sidebar/Sidebar';
import styles from './AppLayout.module.css';
import Map from '../../Components/Map/Map';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  )
}
