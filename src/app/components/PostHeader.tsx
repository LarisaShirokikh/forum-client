import { Plug, Plus } from "lucide-react";
import React from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PostHeader = ({ user, createdAt }) => {
    const avatarColor = getRandomColor();
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        {user.avatar ? (
          <img
            src={`http://localhost:4000${user.avatar}`}
            alt={`${user.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: avatarColor }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-m text-gray-500 font-medium">{user.name}</h2>
          <p className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="px-2 py-1 bg-gray-300 text-white rounded-lg text-sm">
          Подписаться
        </button>
        <button className="text-gray-500">
          <Plus />
        </button>
      </div>
    </header>
  );
};

export default PostHeader;
