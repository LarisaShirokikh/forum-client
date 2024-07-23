"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import UserMenu from "./UserMenu";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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
    <div className="flex items-center gap-2 cursor-pointer p-5">
      {user?.avatar ? (
        <Image
          src={user?.avatar}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
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
