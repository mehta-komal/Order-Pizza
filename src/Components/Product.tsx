import React, { useContext } from "react";
import { Acontext } from "../App";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Config from "../Config";
import { Button } from "@mui/material";

const Product: React.FC = () => {
  const navigate = useNavigate();
  const { setdata, setIsLoading } = useContext(Acontext);

  const handlePizza = () => {
    console.log("API URL:", Config.apikeydata);
    axios
      .get(Config.apikeydata)
      .then((res) => {
        console.log(res.data);
        setdata(res.data.varieties);
        navigate("/data");
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="product-div">
        <div className="card-container-img">
          <div className="img-text">
            <div className="text">
              <p>Are You Hungry?</p>
              <h1>Don't Wait!</h1>
              <Button onClick={handlePizza} variant="contained">
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Product;
