import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Post from "../components/Post";
import axios from "axios";

export default function Dashboard(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="dash">
      <div className="feed">
        <div className="post">
          <Post user={props.user} />
        </div>
        <div>
          {posts.map((post) => {
            return (
              <div className="others">
                <div className="user">{post.username}</div>
                <div className="content">
                  {post.photo ? (
                    <img
                      width="500px"
                      src={`./uploads/${post.photo}`}
                      alt="disp"
                    />
                  ) : null}
                  {post.video ? (
                    <video width="500px" controls>
                      <source src={`./uploads/${post.video}`} alt="vids" />
                    </video>
                  ) : null}
                  <p>{post.post}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="profile">
        <Profile user={props.user} />
      </div>
    </div>
  );
}
