import { toast } from "sonner";
import { env } from "../../env.mjs";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const signOut = async () => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw Error();
      }

      toast.success("Sign out successfuly");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Couldn't sign-out");
    }
  };

  return { signOut };
};
