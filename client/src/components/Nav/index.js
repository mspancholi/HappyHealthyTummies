import React from "react";
import { Link } from "react-router-dom";

import "./style.css";


function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand text-center" to="/" >
        <img className="healthy-meal-img" src="/images/healthy-meal.jpg" alt="healthy-meal" />
        <span className="navTitle">Happy Healthy Tummies</span>
      </Link>
    </nav>
  )
}

export default Nav;