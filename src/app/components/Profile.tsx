import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUser } from "../context/UserContext";
import EditProfileForm from "./EditProfileModal";
import { Edit, ImageDown } from "lucide-react";
import { UserProfile } from "@/interface/UserProfile";
import { getLastSeenText } from "@/lib/lib";
import { getProfile, uploadAvatar } from "../db/apiUser";
import LoadingWrapper from "./LoadingWrapper";

const MEDIA_URL = process.env.NEXT_PUBLIC_API_MEDIA_URL;

const Profile = () => {
  const { user, loading } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (token) {
          const response: UserProfile = await getProfile(token);


          setProfile(response);
        }
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          console.error("No token found!");
          return;
        }

        const uploadedData = await uploadAvatar(event.target.files[0], token);

        setProfile((prevProfile) =>
          prevProfile
            ? {
                ...prevProfile,
                avatar: uploadedData.avatar,
              }
            : null
        );
      } catch (error) {
        console.error("Error uploading avatar: ", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleEditProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };


  return (
    <LoadingWrapper loading={loading || !profile}>
      <div className="container mx-auto p-4 relative">
        <div className="border rounded-lg overflow-hidden text-center relative">
          <div className="p-4 bg-gradient-to-b from-blue-50 via-pink-50 to-yellow-50 text-gray-600 rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={`${MEDIA_URL}${profile?.avatar}` || "/noAvatar.png"}
                  alt="Avatar"
                  className="w-40 h-40 rounded-full object-cover"
                />
                <label className="absolute bottom-0 right-0 p-1 bg-gray-200 rounded-full cursor-pointer z-10">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                  />
                  <ImageDown color="gray" />
                </label>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-700">
                  {profile?.firstName} {profile?.lastName}
                </h1>
                <p className="text-gray-600">{profile?.name}</p>
                <p className="text-gray-600">{profile?.roles}</p>
                <p className="text-gray-600">{profile?.about}</p>
                <p className="text-green-600">
                  <strong className="text-gray-600">Был на сайте:</strong>{" "}
                  {profile?.lastSeen
                    ? getLastSeenText(profile.lastSeen)
                    : "неизвестно"}
                </p>
                <p className="text-gray-600">
                  <strong>Карма:</strong> {profile?.karma}
                </p>
                <p className="text-gray-600">
                  <strong>Зарегистрирован:</strong>{" "}
                  {new Date(profile?.createdAt || "").toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Город:</strong> {profile?.city}
                </p>
                <p className="text-gray-600">
                  <strong>Работа:</strong> {profile?.work}
                </p>
                <p className="text-gray-600">
                  <strong>Веб-сайт:</strong> {profile?.website}
                </p>
              </div>
            </div>
            {isEditing && profile ? (
              <EditProfileForm profile={profile} onSave={handleEditProfile} />
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 p-2 cursor-pointer z-20"
              >
                <Edit size={24} color="gray" />
              </div>
            )}
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

export default Profile;
