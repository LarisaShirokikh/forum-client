"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { z } from "zod";
import { useUser } from "@/context/UserContext";
import HeroCarousel from "./HeroCarousel";

const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type SignInFormData = z.infer<typeof SignInSchema>;

const SignIn: React.FC = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        data
      );
      if (response.data.warningMessage) {
        toast.error(response.data.warningMessage);
        console.error(response.data.warningMessage);
      } else {
        const user = response.data;
        console.log("Setting user:", user); // Debug log
        setUser(user);
        Cookies.set("accessToken", response.data.token, { expires: 7 });

        toast.success("Вы успешно вошли в систему!");
        router.push("/");
        console.log("User login successfully:", response.data);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const handleRegisterRedirect = () => {
    router.push("/register");
  };
   return (
     <div className="flex w-full ">
       <div className="w-1/2 flex items-center justify-center bg-gray-100 p-8">
         <form
           className="space-y-6 w-full max-w-md"
           onSubmit={handleSubmit(onSubmit)}
         >
           <div>
             <h2 className=" text-3xl  text-gray-700">Вход</h2>
           </div>
           <div className="rounded-md shadow-sm -space-y-px">
             <div>
               <label htmlFor="email" className="sr-only">
                 Email
               </label>
               <input
                 id="email"
                 {...register("email")}
                 type="email"
                 autoComplete="email"
                 required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                 placeholder="Email адрес"
               />
               {errors.email && (
                 <p className="text-red-500 text-xs mt-1">
                   {errors.email.message}
                 </p>
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
                 autoComplete="current-password"
                 required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                 placeholder="Пароль"
               />
               {errors.password && (
                 <p className="text-red-500 text-xs mt-1">
                   {errors.password.message}
                 </p>
               )}
             </div>
           </div>
           <div className="flex gap-2">
             <button
               type="submit"
               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
             >
               Войти
             </button>
             <button
               type="button"
               onClick={handleRegisterRedirect}
               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-600  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
             >
               Зарегистрироваться
             </button>
           </div>
         </form>
       </div>
       <div className="w-1/2 flex items-center justify-center">
         <HeroCarousel />
       </div>
     </div>
   );
};

export default SignIn;


