"use client";
import { trpc } from "@/trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { ReactNode, useState } from "react";
import { env } from "../../env.mjs";

type Props = {
    children:ReactNode
};


const Providers = (props: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_SERVER_URL!}/api/trpc`,
          fetch(url,options) {
            return fetch(url,{
                ...options,
                credentials:"include"
            })
          },
          // You can pass any HTTP headers you wish here
          async headers() {
            return {};
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
