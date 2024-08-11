"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { createPost } from "../db/apiPost";

export const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const { user } = useUser();
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    const newPhotos: File[] = [];
    const newVideos: File[] = [];
    const newFiles: File[] = [];

    acceptedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newPhotos.push(file);
      } else if (file.type.startsWith("video/")) {
        newVideos.push(file);
      } else if (file.type === "application/pdf") {
        newFiles.push(file);
      }
    });

    setPhotos((prevFiles) => [...prevFiles, ...newPhotos]);
    setVideos((prevFiles) => [...prevFiles, ...newVideos]);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
      "video/*": [".mp4", ".mov", ".avi", ".mkv"],
      "application/pdf": [".pdf"],
    },
  });

  const removeFile = (file: File, type: "photos" | "videos" | "files") => {
    if (type === "photos") {
      setPhotos((prevFiles) => prevFiles.filter((f) => f !== file));
    } else if (type === "videos") {
      setVideos((prevFiles) => prevFiles.filter((f) => f !== file));
    } else if (type === "files") {
      setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("userId", user?.id.toString() || "");

    if (photos.length > 0) {
      photos.forEach((file) => formData.append("photos", file));
    }

    if (videos.length > 0) {
      videos.forEach((file) => formData.append("videos", file));
    }

    if (files.length > 0) {
      files.forEach((file) => formData.append("files", file));
    }

    try {
      await createPost(formData);
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 border-gray-300 p-4 rounded-lg text-center cursor-pointer mb-4",
          })}
        >
          <input {...getInputProps()} />
          <p>Перетащите фото, видео или файлы сюда или нажмите для загрузки</p>
        </div>

        <div className="mb-4">
          {photos.map((file) => (
            <div
              key={file.name}
              className="flex justify-between items-center mb-2"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-32 h-32 object-cover mr-4"
              />
              <button
                type="button"
                onClick={() => removeFile(file, "photos")}
                className="text-red-500 hover:underline"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <div className="mb-4">
          {videos.map((file) => (
            <div
              key={file.name}
              className="flex justify-between items-center mb-2"
            >
              <video
                src={URL.createObjectURL(file)}
                controls
                className="w-32 h-32 object-cover mr-4"
              />
              <button
                type="button"
                onClick={() => removeFile(file, "videos")}
                className="text-red-500 hover:underline"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <div className="mb-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex justify-between items-center mb-2"
            >
              <p>{file.name}</p>
              <button
                type="button"
                onClick={() => removeFile(file, "files")}
                className="text-red-500 hover:underline"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <label className="block text-gray-700">Заголовок</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Описание</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          required
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-blue-300 via-pink-400 to-yellow-400 text-white rounded-lg hover:underline"
        >
          Создать
        </button>
      </div>
    </form>
  );
};
