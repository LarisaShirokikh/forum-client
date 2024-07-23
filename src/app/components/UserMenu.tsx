// components/Menu.tsx
"use client";
import { BookCheck, LogOut, PlusCircle, Settings, User, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "../context/UserContext";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void; 
}

const UserMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const { logout } = useUser();
  const router = useRouter();
  if (!isOpen) return null;

  const handleRedirect = (path: string) => {
    console.log(`Redirecting to ${path}`);
    router.push(path);
    onClose();
  };

  const handleCreatePost = () => {
    setCreatePostModalOpen(true);
    onClose();
  };

  const handleLogout = async () => {
    logout();
    console.log("Logout complete");
    onClose();
  };

  return (
    <>
      <div className="absolute w-80 top-20 text-gray-700 right-10 bg-white shadow-md rounded-xl p-2">
        <ul>
          <li
            onClick={() => handleRedirect("/myProfile")}
            className="flex justify-between items-center p-2 hover:bg-gray-200 cursor-pointer"
          >
            <span>Мой профиль</span>
            <User color="gray" />
          </li>
          <li
            onClick={() => handleRedirect("/inviteFriends")}
            className="flex justify-between border-t items-center p-2 hover:bg-gray-200 cursor-pointer"
          >
            <span>Пригласить друзей</span>
            <UsersRound color="gray" />
          </li>
          <li
            onClick={() => handleRedirect("/bookmarks")}
            className="flex justify-between border-t items-center p-2 hover:bg-gray-200 cursor-pointer"
          >
            <span>Закладки</span>
            <BookCheck color="gray" />
          </li>
          <li
            onClick={() => handleRedirect("/settings")}
            className="flex justify-between border-t items-center p-2 hover:bg-gray-200 cursor-pointer"
          >
            <span>Настройки</span>
            <Settings color="gray" />
          </li>
          <li
            onClick={() => handleRedirect("/create-post")}
            className="flex justify-between border-t items-center p-2 hover:bg-gray-200 cursor-pointer"
          >
            <span>Создать пост</span>
            <PlusCircle color="gray" />
          </li>
          <li
            onClick={handleLogout}
            className="flex justify-between border-t items-center p-2 hover:bg-gray-200 cursor-pointer"
          >
            <span>Выйти</span>
            <LogOut color="gray" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
