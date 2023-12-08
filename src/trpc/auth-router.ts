import { AuthSchema } from "../lib/validators/auth-vaildators";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const auth = router({
  createUser: publicProcedure.input(AuthSchema).mutation(async ({ input }) => {
    const { email, password } = input;
    const payload = await getPayloadClient({});

    const { docs: users } = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email,
        },
      },
    });
    if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });
    await payload.create({
      collection: "users",
      data: {
        email,
        password,
      },
    });
    return { email };
  }),
  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient({});

      const isVerify = await payload.verifyEmail({
        collection: "users",
        token,
      });
      if (!isVerify) throw new TRPCError({ code: "UNAUTHORIZED" });
      return { succes: true };
    }),

  signIn: publicProcedure.input(AuthSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;
    const { res } = ctx;
    const payload = await getPayloadClient({});
    try {
      await payload.login({
        collection: "users",
        data: { email, password },
        res,
      });
    } catch (error) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return { succes: true };
  }),
});
