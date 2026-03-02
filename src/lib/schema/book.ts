import { z } from "zod";

const PRIMES_100_200 = [101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];

const isPrime = (n: number): boolean => {
  return PRIMES_100_200.includes(n);
};

export const bookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  year: z.number().int(),
  isbn: z.string().min(1),
  price: z
    .number()
    .int()
    .min(100)
    .max(200)
    .refine((p) => isPrime(p), "Price must be a prime number between 100 and 200"),
});

export type Book = z.infer<typeof bookSchema>;
