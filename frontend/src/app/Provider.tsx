"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AuthLoading } from "@/components/auth/AuthLoading";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <AuthProvider>
      <AuthLoading>{children}</AuthLoading>
    </AuthProvider>
  );
};

export default Provider;
