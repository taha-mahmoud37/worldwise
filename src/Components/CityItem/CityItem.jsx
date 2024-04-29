/* eslint-disable react/prop-types */
import { useCities } from "../../Context/CityContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const{ currentCity } = useCities();
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const { cityName, emoji, date, id, position } = city;
  return (
    <li >
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h2 className={styles.name}>{cityName}</h2>
        <time>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
