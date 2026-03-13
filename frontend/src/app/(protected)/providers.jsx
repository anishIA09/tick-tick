"use client";

import { AuthProvider } from "@/context/auth-context";
import React from "react";

export const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
