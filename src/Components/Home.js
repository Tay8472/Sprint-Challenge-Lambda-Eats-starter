import React from "react";
import { Link } from "react-router-dom";
import banner from "../pizza.jpg";
import "./Home.css";

let Home = () => {
  return (
    <div>
      <header className="header">
        <h1>Tay Tay's Pizza</h1>
        <p>We got sum pizza that we sell here</p>
        <img src={banner} />
      </header>
      <div className="formContainer">
        <Link to="/pizza">
          <button>Order Pizza NOW!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
