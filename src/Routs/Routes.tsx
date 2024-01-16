import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Signin from "../Components/Signin";
import GetData from "../Components/GetData";
import Product from "../Components/Product";
import Data from "../Components/Data";
import Cart from "../Components/Cart";
import Profile from "../Components/Profile";
import ProductDetail from "../Components/ProductDetail";
import OrderHistory from "../Components/OrderHistory";
import Settings from "../Components/Settings";
import { Acontext } from "../App";
import "react-toastify/dist/ReactToastify.css";

const Routs: React.FC = () => {
  const { isLogin } = useContext(Acontext);

  return (
   
      <Routes>
        <Route path="/alldata" element={<GetData />} />
        <Route path="/" element={<Product />} />
        <Route path="/data" element={<Data />} />
        <Route
          path="/profile"
          element={isLogin ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isLogin ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/order"
          element={isLogin ? <OrderHistory /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/setting" element={<Settings />} />
      </Routes>
   
  );
};

export default Routs;
