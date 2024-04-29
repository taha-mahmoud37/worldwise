/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch (err) {
        alert(" there was an error during loading data");
      } finally {
        setisLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert(" there was an error during loading data");
    } finally {
      setisLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(" cities was used outside the citiesProvider");
  return context;
}
export { CitiesProvider, useCities };
