import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int().positive(),
  login: z.string().min(1),
  password: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
