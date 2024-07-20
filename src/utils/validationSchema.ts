// validationSchema.ts
import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Имя пользователя должно содержать минимум 2 символа")
      .max(50, "Имя пользователя должно содержать максимум 50 символов")
      .min(1, "Имя пользователя обязательно"), // заменили nonempty на min(1)
    email: z
      .string()
      .email("Некорректный адрес электронной почты")
      .min(1, "Адрес электронной почты обязателен"), // заменили nonempty на min(1)
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .min(1, "Пароль обязателен"), // заменили nonempty на min(1)
    confirmPassword: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .min(1, "Подтверждение пароля обязательно"), // заменили nonempty на min(1)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });
