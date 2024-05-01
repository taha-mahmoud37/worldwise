import Sidebar from '../../Components/Sidebar/Sidebar';
import styles from './AppLayout.module.css';
import Map from '../../Components/Map/Map';
import User from '../../Components/User/User';

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  )
}
