"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/utils/validationSchema";
import { FieldError } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";
import HeroCarousel from "./HeroCarousel";

const SignUp: React.FC = () => {
  const { setUser } = useUser();
  const router = useRouter();
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
        
        toast.success("User registered successfully!");
        router.push("/");
        console.log("User registered successfully:", response.data);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="flex ">
      <div className="flex-1  text-white flex items-center justify-center">
        <div className="space-y-4">
          <HeroCarousel />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6  text-3xl  text-gray-700">Регистрация</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Ваше имя
                </label>
                <input
                  id="name"
                  {...register("name")}
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Имя или никнейм"
                />
                {errors.username && (
                  <div className="text-red-500 text-xs mt-1">
                    {(errors.username as FieldError)?.message}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {(errors.email as FieldError)?.message}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Пароль
                </label>
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Пароль"
                />
                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {(errors.password as FieldError)?.message}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Повторите пароль
                </label>
                <input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Повторите пароль"
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 text-xs mt-1">
                    {(errors.confirmPassword as FieldError)?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Зарегистрироваться
              </button>
              <button
                type="button"
                onClick={handleLoginRedirect}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Войти
              </button>
            </div>
          </form>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

