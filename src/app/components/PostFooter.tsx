"use client";
import React, { useState } from "react";
import { Eye, Heart, MessageSquare, Share2 } from "lucide-react";
import { usersComments } from "@/interface/Comment";
import { PostFooterProps } from "@/interface/Post";
import CommentsSection from "./CommentsSection";

const PostFooter = ({
  likes = 0,
  commentsCount = 0, 
  usersComments = [],
  views = 0,
  postId,
}: PostFooterProps & { postId: string }) => {
  const [showUsersComments, setShowUsersComments] = useState(false);

  return (
    <footer className="mt-4 pt-4 border-t border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-sm text-gray-400 hover:text-red-400">
            <Heart size={20} />
            <span className="ml-1">{likes}</span>
          </button>
          <button
            className="flex items-center text-sm text-gray-400 hover:text-gray-900"
            onClick={() => setShowUsersComments(!showUsersComments)}
          >
            <MessageSquare size={20} />
            <span className="ml-1">{commentsCount}</span>
          </button>
          <button className="flex items-center text-sm text-gray-400 hover:text-gray-900">
            <Eye size={20} />
            <span className="ml-1">{views}</span>
          </button>
        </div>
        <button className="flex items-center text-sm text-gray-400 hover:text-gray-900">
          <Share2 size={20} />
        </button>
      </div>

      {/* Секция комментариев */}
      {showUsersComments && (
        <CommentsSection postId={postId} initialComments={usersComments} />
      )}
    </footer>
  );
};

export default PostFooter;
