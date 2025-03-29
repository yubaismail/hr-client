"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login"); // Redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;
