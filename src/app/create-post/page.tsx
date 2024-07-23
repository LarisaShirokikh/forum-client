// pages/create-post.tsx
"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import { CreatePostForm } from "../components/CreatePostForm";

const CreatePostPage = () => {
 

  return (
    <ProtectedRoute>
      <div className=" mx-auto p-6 bg-white rounded-lg ">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Создать пост</h2>
        <CreatePostForm />
      </div>
    </ProtectedRoute>
  );
};

export default CreatePostPage;

