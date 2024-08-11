"use client";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import { useUser } from "../context/UserContext";
import { Post as PostType } from "@/interface/Post";
import { fetchPosts } from "../db/apiPost";

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user: currentUser } = useUser();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allPosts = await fetchPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
