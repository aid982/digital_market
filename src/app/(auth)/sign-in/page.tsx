"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema, TAuthSchemaType } from "@/lib/validators/auth-vaildators";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });
  const onSubmit = handleSubmit((data) => {
    signIn({
      ...data,
    });
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");
  const { mutate: signIn,isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success(`Sing in successfully`);      
      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push(`/sell`);
        return;
      }
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid password or login");
        return;
      }
      toast.error("Something went wrong. Please try again");
    },
  });

  const continiueAsSeller = () => {
    router.push("?as=seller");
  };

  const continiueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full space-y-6 sm:w-[350px]  flex-col">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="w-20 h-20" />
            <h1 className="text-2xl font-bold">Sign in to your {isSeller&& <span>seller </span>}account</h1>
            <Link
              className={buttonVariants({
                className: "gap-1.5",
                variant: "link",
              })}
              href={"/sign-up"}
            >
              Do&apos;t have an account? Sign up
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2 ">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="youemail@email.com"
                  />
                  {errors?.email && (
                    <p className="text-red-400 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2 ">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-red-400 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button>Sign in</Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute flex items-center inset-0">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase ">
                <span className="bg-background px-2 text-muted-foreground ">
                  or
                </span>               
              </div>             
            </div>
            {isSeller ? (
                  <Button variant="secondary" disabled={isLoading} onClick={continiueAsBuyer}>
                    Continiue as Custumer
                  </Button>
                ) : (
                  <Button variant="secondary" disabled={isLoading} onClick={continiueAsSeller}>
                    Continiue as seller
                  </Button>
                )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
