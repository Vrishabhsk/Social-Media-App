import React from "react";
import image from "../images/1.png";
import StyledButton from "../components/StyledButton";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="front">
      <h1 className="wel-text">
        <u>Royal Galore.</u>
        <br />
        Discover the world while sitting in your house. Stay Updated with feed
        from your friends and family at all times.
        <br />
        <div className="linked">
          Get Started by registering.{" "}
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
