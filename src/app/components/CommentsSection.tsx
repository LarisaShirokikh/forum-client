import React, { useState } from "react";
import { addComment } from "../db/apiPost";
import { useUser } from "../context/UserContext";
import { CommentsSectionProps, usersComments } from "@/interface/Comment";
import { AtSign, Send, Tag, ImagePlus } from "lucide-react";

const MEDIA_URL = process.env.NEXT_PUBLIC_API_MEDIA_URL;

const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  initialComments,
}) => {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] =
    useState<usersComments[]>(initialComments);
  const { user: currentUser } = useUser();

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;

    try {
      const newAddedComment = await addComment(newComment, postId, currentUser);
      setAllComments((prev) => [...prev, newAddedComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mb-2">
      <div className="mb-2">
        {allComments.map((comment, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-700">{comment.text}</p>
            {/* можно добавить отображение имени пользователя и времени создания */}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        {/* Аватарка текущего пользователя */}
        {currentUser && currentUser.avatar && (
          <img
            src={`${MEDIA_URL}${currentUser?.avatar}` || "/noAvatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}

        {/* Поле ввода комментария и кнопка отправки */}
        <div className="flex flex-1 items-center border rounded-md px-3 py-2 gap-3">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Добавьте комментарий..."
            className="flex-1 outline-none "
          />
          {/* Значок добавления медиа */}
          <button className="text-gray-300 hover:text-gray-400 mx-1">
            <ImagePlus  size={20} />
          </button>

          {/* Значок упоминания юзера */}
          <button className="text-gray-300 hover:text-gray-400 mx-1">
            <AtSign size={20} />
          </button>

          {/* Значок метки */}
          <button className="text-gray-300 hover:text-gray-400 mx-1">
            <Tag size={20} />
          </button>

          {/* Кнопка отправки */}
          <button
            onClick={handleCommentSubmit}
            className="text-gray-400 hover:text-gray-500 ml-1"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
