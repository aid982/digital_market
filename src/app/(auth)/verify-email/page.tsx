import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = (props: Props) => {
  const token = props.searchParams.token;
  const toEmail = props.searchParams.to;
  return (
    <div className="container relative flex justify-center items-center flex-col pt-20 lg:px-0">
      <div className=" mx-auto flex w-full space-y-6 sm:w-[350px]  flex-col">
        {token && typeof token === "string" ? (
          <VerifyEmail token={token} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60">
              <Image
                alt="hipo email sent email"
                src={"/hippo-email-sent.png"}
                fill
              />
            </div>
            <h3 className="font-semibold text-2xl">Check your email</h3>
            {toEmail ? (
              <p className="text-center text-muted-foreground">
                We&apos;ve sent a verification link to <span>{toEmail}</span>
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                We&apos;ve sent a verification link
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default page;
