// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Buttons from "../Button/Buttons";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import { useUrlPosition } from "../../Hooks/useUrlPosition";
// import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import { useCities } from "../../Context/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const { createNewCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodeError, setGeoCodeError] = useState("");
  // const [isLoadingGeoCode, setisLoadingGeoCode] = useState(false);

  useEffect(function () {
    if (!lat & !lng) return;
    async function fetchCityData() {
      try {
        // setisLoadingGeoCode(true);
        setGeoCodeError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        if (!res.ok) throw new Error("Hi Man, Chose Valide coordinates");
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That does not seem to be city, Click somewhere else"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setGeoCodeError(error.message);
      } finally {
        // setisLoadingGeoCode(false);
      }
    }
    fetchCityData();
  });
  async function handelSubmit(e) {
    e.preventDefault();
    if (!cityName && !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createNewCity(newCity);
    navigate("/app/cities");
  }

  // if (isLoadingGeoCode) return <Spinner />;
  if (!lat && !lng)
    return <Message message={"Start be clicking somewhere on the map"} />;
  if (geoCodeError) return <Message message={geoCodeError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ?styles.loading :""} `}
      onSubmit={handelSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="data"
          selected={date}
          onChange={(data) => setDate(data)}
          dateFormat={"dd/mm/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Buttons type={"primary"}>Add</Buttons>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
