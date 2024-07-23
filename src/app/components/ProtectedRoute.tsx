// components/ProtectedRoute.tsx
"use client";
import { useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
