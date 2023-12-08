import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().min(3, {
    message: "email should not be empty",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters long",
  }),
});
export type TAuthSchemaType = z.infer<typeof AuthSchema>;
