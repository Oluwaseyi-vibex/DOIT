// components/LogoutButton.tsx
"use client";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
