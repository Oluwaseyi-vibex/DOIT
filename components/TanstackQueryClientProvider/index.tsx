"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClientProvider as TanstackQueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const AppQueryClientProvider = () => {
  const queryClient = new QueryClient();

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryClientProvider>
  );
};

export default AppQueryClientProvider;
