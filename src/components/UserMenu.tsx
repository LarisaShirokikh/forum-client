// components/Menu.tsx
import { BookCheck, LogOut, Settings, User, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void; 
}

const UserMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  if (!isOpen) return null;

  const handleRedirect = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
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
          onClick={() => handleRedirect("/logout")}
          className="flex justify-between border-t items-center p-2 hover:bg-gray-200 cursor-pointer"
        >
          <span>Выйти</span>
          <LogOut color="gray" />
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
