import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import StyledButton from "./StyledButton";

export default function Profile(props) {
  return (
    <div className="profileCard">
      <img
        src={`./uploads/${props.user.profilePic}`}
        className="profpic"
        alt="profile"
      />
      <p>{props.user.username}</p>
      <div className="btn">
        <Link to="/update-profile" className="links">
          <StyledButton content="Edit Profile" />
        </Link>
        <Link to="/Myposts" className="links">
          <StyledButton content="View My Posts" />
        </Link>
        <StyledButton
          onClick={() => {
            axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:5000/logout",
            }).then((res) => {
              console.log(res.data);
            });
          }}
          content="Log Out of Profile"
        />
      </div>
    </div>
  );
}
