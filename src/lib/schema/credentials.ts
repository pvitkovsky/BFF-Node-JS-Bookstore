import { z } from "zod";

export const credentialsSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;
