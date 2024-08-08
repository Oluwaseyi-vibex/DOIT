// components/ClientProviders.tsx
"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProviderWrapper } from "@/components";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const ClientProviders: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProviderWrapper>{children}</SessionProviderWrapper>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ClientProviders;
