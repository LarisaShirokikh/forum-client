import React, { useState } from "react";
import Cookies from "js-cookie";
import { UserProfile } from "@/interface/UserProfile";
import { updateProfile } from "../db/apiUser";


interface EditProfileFormProps {
  profile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState(profile);
  const token = Cookies.get("accessToken");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("token", token);
      if (!token) {
        console.error("No token found!");
        return;
      }
      const updatedProfile = await updateProfile(formData, token);
      onSave(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-700">Имя</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Фамилия</label>
        <input
          type="text"
          name="surname"
          value={formData.surname || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Город</label>
        <input
          type="text"
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Обо мне</label>
        <textarea
          name="about"
          value={formData.about || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Описание</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Работа</label>
        <input
          type="text"
          name="work"
          value={formData.work || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Веб-сайт</label>
        <input
          type="text"
          name="website"
          value={formData.website || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Сохранить
      </button>
    </form>
  );
};

export default EditProfileForm;
