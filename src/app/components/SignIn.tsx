// components/SignIn.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useUser } from "@/app/context/UserContext";
import {  Apple } from "lucide-react"; 

const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type SignInFormData = z.infer<typeof SignInSchema>;

interface SignInProps {
  onToggleAuthMode: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onToggleAuthMode}) => {
  const { login } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    await login(data.email, data.password);
  };

  

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center bg-white p-6 w-80">
        <h1 className="text-2xl text-gray-600 font-bold mb-4">
          Вход в аккаунт
        </h1>
        <button className="flex items-center text-gray-600 justify-center w-full py-2 mb-2 border rounded-lg hover:bg-gray-100">
          {/* <Google className="mr-2" /> */}
          Продолжить с Google
        </button>
        <button className="flex items-center text-gray-600 justify-center w-full py-2 mb-2 border rounded-lg hover:bg-gray-100">
          <Apple className="mr-2" />
          Продолжить с Apple
        </button>
        <div className="w-full border-t my-4" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Email адрес"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
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
              autoComplete="current-password"
              required
              className="appearance-none rounded-lg w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              placeholder="Пароль"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-300 via-pink-400 to-yellow-400 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Войти
          </button>
        </form>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <p>Нет аккаунта?</p>
          <button
            type="button"
            onClick={onToggleAuthMode}
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-pink-400 to-yellow-400 hover:underline"
          >
            Регистрация
          </button>
        </div>
      </div>
      <div className="mt-4 text-sm text-center">
        <p>Как войти через VK, FB или X?</p>
      </div>
    </div>
  );
};

export default SignIn;
