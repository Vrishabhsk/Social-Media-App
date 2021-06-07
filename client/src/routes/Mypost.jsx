import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Mypost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/myposts",
    }).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      <h1 className="head">My Posts</h1>
      <div className="myposts">
        <div>
          {posts.map((post) => {
            return (
              <div className="others top">
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
    </>
  );
}
