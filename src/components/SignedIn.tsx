"use client";
import { useUser } from "@/context/UserContext";
import React from "react";

const SignedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  return user ? <>{children}</> : null;
};

export default SignedIn;
