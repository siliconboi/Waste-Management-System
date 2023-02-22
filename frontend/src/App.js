import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./auth/Signin";
import Signup from './auth/Signup';
import Payment from "./functionality/Payment";
import Home from "./Home";
import Header from './Header';
import FinalPage from "./functionality/FinalPage";
import Results from "./functionality/Results";
import SearchParams from "./functionality/SearchParams";
import Store from "./Store";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <StrictMode>
        <BrowserRouter>
            <header>
            <Header/>
            </header>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/collect" element={<SearchParams />} /> 
            <Route path="/collecttype" element={<Results />} /> 
            <Route path="/payment" element={<Payment />} /> 
            <Route path="/finalpage" element={<FinalPage />} /> 
          </Routes>
        </BrowserRouter>
    </StrictMode>
  );
};

