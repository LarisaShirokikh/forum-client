// components/Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import LoginModal from "./LoginModal";
import UserButton from "./UserButton";
import { useUser } from "@/app/context/UserContext";

const Navbar = () => {
  const { user, openLoginModal, isLoginModalOpen, closeLoginModal } = useUser();

  

  return (
    <div className="h-20 flex items-center justify-between">
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-3xl text-gray-600">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-pink-400 to-yellow-400">
            Mamski
          </span>
        </Link>
      </div>
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              alt="Homepage"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Главная</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              alt="Friends"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Друзья</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stories.png"
              alt="Stories"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Поиск</span>
          </Link>
        </div>
        {/* <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt="" width={14} height={14} />
        </div> */}
      </div>
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        {user ? (
          <>
            <div className="cursor-pointer">
              <Image src="/people.png" alt="" width={24} height={24} />
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" alt="" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <Image src="/notifications.png" alt="" width={20} height={20} />
            </div>
            <UserButton />
          </>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <Image src="/login.png" alt="" width={20} height={20} />
            <button
              onClick={() => {
                console.log("Login button clicked");
                openLoginModal();
              }}
            >
              Войти
            </button>
          </div>
        )}
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default Navbar;
