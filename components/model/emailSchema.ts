import {z} from 'zod'

const emailSchema = z.object({
    email: z.string().email(),
});

export type EmailSchema = z.infer<typeof emailSchema>;
export {emailSchema};