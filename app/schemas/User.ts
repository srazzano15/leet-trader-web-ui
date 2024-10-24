import { z } from "zod";

/**
 * requirement schema for user registration
 */

export const User = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().email(),
    password: z.string().min(8),
    retypePassword: z.string(),
  })
  .required()
  .refine(
    (values) => {
      return values.password === values.retypePassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );  // npm install --save '@awesome.me/kit-KIT_CODE@latest'
