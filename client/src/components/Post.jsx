import React from "react";
import SpringModal from "./SpringModal";

export default function Post(props) {
  return (
    <div className="postCard">
      <img
        src={`./uploads/${props.user.profilePic}`}
        className="postProf"
        alt="profilePic"
      />
      <div className="modal">
        <SpringModal
          post
          title="Create a Post"
          des="What do you want to talk about?"
        />
        <SpringModal photo title="Add Photo with Caption" des="Caption" />
        <SpringModal video title="Add Video with Caption" des="Caption" />
      </div>
    </div>
  );
}
