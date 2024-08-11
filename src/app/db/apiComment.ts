import axios from "axios";
import { usersComments } from "@/interface/Comment";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const addComment = async (
  text: string,
  postId: string,
  userId: number
) => {
  try {
    const response = await axios.post(`${BASE_URL}/comment`, {
      text,
      postId,
      userId,
    });
    return response.data as usersComments;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};
