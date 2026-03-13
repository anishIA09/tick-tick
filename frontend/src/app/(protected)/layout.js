import { AuthProvider } from "@/context/auth-context";
import React from "react";

const ProtectedLayout = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ProtectedLayout;
