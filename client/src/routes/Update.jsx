import React, { useState } from "react";
import Text from "../components/Text";
import StyledButton from "../components/StyledButton";
import axios from "axios";
import { toast } from "react-toastify";

export default function Update(props) {
  const [userDetails, setUserDetails] = useState({
    username: props.user.username,
    email: props.user.email,
    password: props.user.password,
    profilePic: props.user.profilePic,
    oldPass: "",
    newPass: "",
  });

  const [newPic, setNewPic] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleFile(event) {
    setNewPic(event.target.files[0]);
  }

  function handleSubmit(event) {
    if (userDetails.oldPass === "" && userDetails.newPass === "") {
      const formData = new FormData();
      formData.append("username", userDetails.username);
      formData.append("email", userDetails.email);
      formData.append("password", userDetails.password);
      if (newPic !== "") formData.append("profilePic", newPic);
      else if (newPic === "")
        formData.append("profilePic", userDetails.profilePic);
      axios({
        method: "POST",
        withCredentials: true,
        data: formData,
        url: "http://localhost:5000/api/update",
      }).then((res) => {
        toast.success(res.data);
      });
    } else if (userDetails.oldPass !== "" && userDetails.newPass !== "") {
      const formData = new FormData();
      formData.append("username", userDetails.username);
      formData.append("email", userDetails.email);
      formData.append("oldPassword", userDetails.oldPass);
      formData.append("newPassword", userDetails.newPass);
      if (newPic !== "") formData.append("profilePic", newPic);
      else if (newPic === "")
        formData.append("profilePic", userDetails.profilePic);
      axios({
        method: "POST",
        withCredentials: true,
        data: formData,
        url: "http://localhost:5000/api/update",
      }).then((res) => {
        toast.success(res.data);
      });
    }
  }

  return (
    <div className="update">
      <img
        src={`./uploads/${userDetails.profilePic}`}
        alt="profile"
        className="updPic"
      />
      <div className="cent">
        <label htmlFor="file">Choose new picture: </label>
        <input type="file" filename="newPic" onChange={handleFile} />
      </div>
      <Text
        label="Username"
        name="username"
        value={userDetails.username}
        onChange={handleChange}
      />
      <Text
        label="Email"
        name="email"
        value={userDetails.email}
        onChange={handleChange}
      />
      <Text
        label="Enter old Password (Only if needed to be changed)"
        name="oldPass"
        type="password"
        onChange={handleChange}
        value={userDetails.oldPass}
      />
      <Text
        label="Enter new Password (Only if needed to be changed)"
        onChange={handleChange}
        name="newPass"
        type="password"
        value={userDetails.newPass}
      />
      <StyledButton onClick={handleSubmit} content="Update" />
    </div>
  );
}
