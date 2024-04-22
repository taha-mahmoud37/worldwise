import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product/Product";
import Pricing from "./Pages/Pricing/Pricing";
import Homepage from "./Pages/Home/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout/AppLayout";
import Login from "./Pages/Login/Login";
import CityList from "./Components/CityList/CityList";
import { useEffect, useState } from "react";
import CountryList from "./Components/CountryList/CountryList";

const BASE_URL = "http://localhost:9000";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setisLoading] = useState(false);

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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
            <Route path="form" element={"form"} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
