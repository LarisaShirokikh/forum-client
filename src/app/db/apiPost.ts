"use client";
import axios from "axios";
import { Post as PostType } from "@/interface/Post";

// Базовый URL для API
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Функция для отправки комментария
export const addComment = async (text: string, postId: string, user: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/comments`, {
      text,
      postId,
      user,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await axios.get<PostType[]>(`${BASE_URL}/post`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const updateViews = async (postId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts/${postId}/views`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const createPost = async (formData: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
