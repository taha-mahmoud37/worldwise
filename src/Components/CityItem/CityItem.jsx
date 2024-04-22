/* eslint-disable react/prop-types */
import styles from './CityItem.module.css';
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


export default function CityItem({city}) {
    console.log(city );
    // eslint-disable-next-line react/prop-types
    const {cityName, emoji, date} = city;
  return (
    <li className={styles.cityItem}>
       <span className={styles.emoji}>{emoji}</span>
       <h2 className={styles.name}>{cityName}</h2>
       <time>{formatDate(date)}</time>
       <button className={styles.deleteBtn}>&times;</button>
    </li>
  )
}
