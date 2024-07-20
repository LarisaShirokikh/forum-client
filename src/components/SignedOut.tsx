
"use client";
import { useUser } from "@/context/UserContext";
import React from "react";

interface SignedOutProps {
  children: React.ReactNode;
}

const SignedOut: React.FC<SignedOutProps> = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return null; // If the user is logged in, do not render the children
  }

  return <>{children}</>; // If the user is not logged in, render the children
};

export default SignedOut;
