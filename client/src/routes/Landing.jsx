import React from "react";
import image from "../images/1.png";
import StyledButton from "../components/StyledButton";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export default function Landing() {
  return (
    <div className="front">
      <h1 className="wel-text">
        <u>Royal Galore</u>
        <br />
        <ArrowRightAltIcon />
        Discover the world while sitting in your house.
        <br />
        <ArrowRightAltIcon />
        Stay connected with your friends and family
        <br />
        <div className="linked">
          Get Started
          <Link to="/Reg" className="links">
            <StyledButton content="Register" />
          </Link>
          <Link to="/Log" className="links">
            <StyledButton content="Login" />
          </Link>
        </div>
      </h1>
      <img src={image} className="landing-image" alt="landing-icon" />
    </div>
  );
}
