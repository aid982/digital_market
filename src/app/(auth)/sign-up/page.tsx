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
import { useRouter } from "next/navigation";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });
  const onSubmit = handleSubmit((data) => {
    addUser({
      ...data,
    });
  });
  const router = useRouter();
  const {
    data,
    mutate: addUser,
    isLoading,
  } = trpc.auth.createUser.useMutation({
    onSuccess:({email})=>{
      console.log('email',email)
      toast.success(`Verification email was sent to ${email}`)
      router.push('/verify-email?to'+email)
    },    
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        toast.error(<p>This email is already in use</p>);
        return;
      }
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }

      toast.error(<p>Something went wrong. Please try again</p>);
    },
  });

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full space-y-6 sm:w-[350px]  flex-col">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="w-20 h-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <Link
              className={buttonVariants({
                className: "gap-1.5",
                variant: "link",
              })}
              href={"/sign-in"}
            >
              Already have an account? Sign in
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
                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
