import { Edit, Trash } from "lucide-react";
import React from "react";
import { User } from "@/interface/User";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getTimeAgo = (dateString: string): string => {
  const createdAtDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - createdAtDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  const getPlural = (
    number: number,
    one: string,
    two: string,
    five: string
  ) => {
    if (number % 10 === 1 && number % 100 !== 11) {
      return one;
    } else if (
      number % 10 >= 2 &&
      number % 10 <= 4 &&
      (number % 100 < 10 || number % 100 >= 20)
    ) {
      return two;
    } else {
      return five;
    }
  };

  if (diffDays > 1) {
    return createdAtDate.toLocaleDateString(); // Отображаем дату, если прошло больше суток
  } else if (diffHours > 0) {
    return `${diffHours} ${getPlural(diffHours, "час", "часа", "часов")} назад`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} ${getPlural(
      diffMinutes,
      "минуту",
      "минуты",
      "минут"
    )} назад`;
  } else {
    return "только что";
  }
};

interface PostHeaderProps {
  user: User;
  createdAt: string;
  currentUser: User | null;
}

const PostHeader = ({ user, createdAt, currentUser }: PostHeaderProps) => {
  const avatarColor = getRandomColor();

  console.log("Current User:", currentUser);

  return (
    <header className="flex items-center justify-between mb-4 p-4  rounded-lg">
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
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg text-gray-800 font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.roles}</p>
          </div>
          <p className="text-xs text-gray-500">{getTimeAgo(createdAt)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {currentUser?.id === user.id ? (
          <>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Edit className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Trash className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
            Подписаться
          </button>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
