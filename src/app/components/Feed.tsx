"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/post");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
