import { z } from "zod";

const authSchema = z.object({
    email: z.string().email(),
    password: z.string().includes("").min(3).max(30)
})

export type AuthSchema = z.infer<typeof authSchema>;
export {authSchema};