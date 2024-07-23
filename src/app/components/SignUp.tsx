// components/SignUp.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/utils/validationSchema";
import { FieldError } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useUser } from "@/app/context/UserContext";

interface SignUpProps {
  onToggleAuthMode: () => void;
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onToggleAuthMode, onClose }) => {
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:4000/api/user", data);
      if (response.data.warningMessage) {
        toast.error(response.data.warningMessage);
        console.error(response.data.warningMessage);
      } else {
        const user = response.data;
        console.log("Setting user:", user); // Debug log
        setUser(user);
        Cookies.set("accessToken", response.data.token, { expires: 7 });

        onClose();
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 ">
      <div className="flex flex-col items-center bg-white p-6 w-80">
        <h2 className="text-2xl text-gray-600 font-bold mb-4">Регистрация</h2>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="sr-only">
              Ваше имя
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Имя или никнейм"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.name as FieldError)?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.email as FieldError)?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="sr-only">
              Пароль
            </label>
            <input
              id="password"
              {...register("password")}
              type="password"
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Пароль"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.password as FieldError)?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="confirmPassword" className="sr-only">
              Повторите пароль
            </label>
            <input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
              className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Повторите пароль"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.password as FieldError)?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-300 via-pink-400 to-yellow-400 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className="flex justify-between text-gray-600 items-center mt-4 text-sm">
        <p>Уже есть аккаунт?</p>
        <button
          type="button"
          onClick={onToggleAuthMode}
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:underline"
        >
          Войти
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default SignUp;
