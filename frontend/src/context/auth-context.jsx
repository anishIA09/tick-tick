"use client";

import { get } from "@/config/api";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use useAtuh within AuthProvider.");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const response = await get({
          url: "/auth/session",
        });

        setUserDetails(response.data?.data);
      } catch (error) {
        console.log("error", error.response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const contextValue = {
    userDetails,
    isLoading,
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
