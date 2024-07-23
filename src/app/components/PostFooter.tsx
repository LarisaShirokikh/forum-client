import { ChefHat, Eye, Heart, MessageSquare, Redo2 } from "lucide-react";
import React from "react";

const PostFooter = ({ likes = [], comments = [], views = 0 }) => {
  return (
    <footer className="flex items-center justify-between mt-4 pt-4 ">
      <div className="flex items-center space-x-4">
        <button className="flex items-center text-sm text-gray-400 hover:text-red-400">
          <Heart size={20} />
          <span className="ml-1">{likes.length}</span>
        </button>
        <button className="flex items-center text-sm text-gray-400 hover:text-gray-900">
          <MessageSquare size={20} />
          <span className="ml-1">{comments.length}</span>
        </button>
        <button className="flex items-center text-sm text-gray-400 hover:text-gray-900">
          <Eye size={20} />
          <span className="ml-1">{views}</span>
        </button>
      </div>
      <button className="flex items-center text-sm text-gray-400 hover:text-gray-900">
        <Redo2 size={20} />
        <span className="ml-1">Share</span>
      </button>
    </footer>
  );
};

export default PostFooter;
