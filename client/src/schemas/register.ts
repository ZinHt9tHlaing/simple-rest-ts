import * as z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 character(s)" })
    .max(8, { message: "Username must contain at most 8 character(s)" })
    .trim(),
  email: z.string().email({ message: "Invalid email address" }).nonempty(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
});
