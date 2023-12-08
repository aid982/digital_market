"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type Props = {
  token: string;
};

const VerifyEmail = (props: Props) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token: props.token,
  });
  if (isError ) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="w-8 h-8 text-red-400" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          This token maybe expired or not. Please try again
        </p>
      </div>
    );
  }
  if (isLoading ) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-20 h-20 text-zinc-300 animate-spin" />
        <h3 className="font-semibold text-xl">Loading ...</h3>
        <p className="text-muted-foreground text-sm">
          This won&apos;t take long
        </p>
      </div>
    );
  }

  if (data?.succes) {
    return (
      <div className="flex flex-col items-center  h-full">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/hippo-email-sent.png" fill alt="Hipo image" />
        </div>

        <h3 className="font-semibold text-xl">You are all set</h3>
        <p className="text-muted-foreground text-sm">
          Thank you for verifiyng your email
        </p>
        <Link
          href="/sign-in"
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Sign in
        </Link>
      </div>
    );
  }
  return <div>{JSON.stringify(data)}</div>;
};

export default VerifyEmail;
