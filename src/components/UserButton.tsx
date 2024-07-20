"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";

const UserButton: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  
const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

const closeMenu = () => {
  setIsMenuOpen(false);
};
  // const handleLoginRedirect = () => {
  //   router.push("/myProfile");
  // };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Image
        src={user?.avatar || "/noAvatar.png"}
        alt="User Avatar"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span onClick={toggleMenu}>{user?.name}</span>
      <UserMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
};

export default UserButton;
