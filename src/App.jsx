import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from './Pages/Product/Product';
import Pricing from './Pages/Pricing/Pricing';
import Homepage from './Pages/Home/Homepage';
import PageNotFound from './Pages/PageNotFound';
import AppLayout from "./Pages/AppLayout/AppLayout";
import Login from './Pages/Login/Login';



export default function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={"list of cities"}  />
          <Route path="cities"/>
          <Route path="countries" element={"list of countries"} />
          <Route path="form" element={"form"} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
