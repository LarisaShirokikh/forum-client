"use client";

import { IUser } from "@/interface/User";
import React, { createContext, useContext, useState, ReactNode } from "react";

// interface IUser {
//   id: number;
//   email: string;
//   token: string;
// }

interface UserContextProps {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  console.log("UserProvider initialized"); // Debug log

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  console.log("useUser context:", context);
  return context;
};
