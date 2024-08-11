"use client";
import React, { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import UserMenu from "./UserMenu";
import { getRandomColor } from "@/lib/lib";

const MEDIA_URL = process.env.NEXT_PUBLIC_API_MEDIA_URL;

const UserButton: React.FC = () => {
  const avatarColor = getRandomColor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const displayName = user?.name || user?.email;
  const initial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2 cursor-pointer p-5 ">
      {user?.avatar ? (
        <img
          src={`${MEDIA_URL}${user.avatar}`}
          alt="`${user.avatar}"
          className="w-10 h-10 rounded-full object-cover"
          onClick={toggleMenu}
        />
      ) : (
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: avatarColor }}
        >
          {initial}
        </div>
      )}
      <span onClick={toggleMenu}>{displayName}</span>
      {isMenuOpen && <UserMenu isOpen={isMenuOpen} onClose={closeMenu} />}
    </div>
  );
};

export default UserButton;
