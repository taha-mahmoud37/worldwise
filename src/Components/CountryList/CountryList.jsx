/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./../Spinner/Spinner";
import Message from "./../Message/Message";
import CountryItem from "./../Countryitem/CountryItem";
import { useCities } from "../../Context/CityContext";

export default function CountryList() {
  const {cities, isLoading} = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking  on a city on the map"}
      />
    );

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    else return [...arr, { country: city.country, emoji: city.emoji }];
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.emoji} country={country} />
      ))}
    </ul>
  );
}
