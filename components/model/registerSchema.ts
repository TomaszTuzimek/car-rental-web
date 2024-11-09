import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    email: z.string().email("Invalid email format")
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export {registerSchema};

