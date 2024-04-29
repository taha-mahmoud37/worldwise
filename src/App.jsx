import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product/Product";
import Pricing from "./Pages/Pricing/Pricing";
import Homepage from "./Pages/Home/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout/AppLayout";
import Login from "./Pages/Login/Login";
import CityList from "./Components/CityList/CityList";

import CountryList from "./Components/CountryList/CountryList";
import City from './Components/City/City';
import Form from './Components/Form/Form';
import { CitiesProvider } from "./Context/CityContext";



export default function App() {
  

  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList  />}
            />
            <Route
              path="cities"
              element={<CityList />}
            />
            <Route
              path="cities/:id"
              element={<City/>}
            />
            <Route
              path="countries"
              element={<CountryList />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}
