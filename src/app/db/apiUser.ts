import { User } from "@/interface/User";
import { UserProfile } from "@/interface/UserProfile";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const updateProfile = async (profile: UserProfile, token: string) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/auth/profile/${profile.id}`,
      profile,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const getProfile = async (token: string): Promise<UserProfile> => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Предполагается, что API возвращает объект { user, token }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const uploadAvatar = async (avatar: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await axios.post(
      `${BASE_URL}/auth/profile/avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};
