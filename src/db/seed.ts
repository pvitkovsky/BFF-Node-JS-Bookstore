import { hash } from "bcryptjs";
import { db } from "./index";
import { books, users } from "./schema";

const PRIMES_100_200 = [101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];

const titles = [
  "War and Peace", "Pride and Prejudice", "Alice in Wonderland", "Hamlet",
  "Decameron", "The Odyssey", "Catch-22", "Buddha's Little Finger",
  "Sapiens", "Structure And Implementation Of Computer Programs",
  "Microsoft Office '97", "Rocket Science For Dummies",
];

async function seed() {
  const bookData = titles.map((title, i) => ({
    title,
    year: 1900 + i,
    isbn: `978-3-16-14841${i}-0`,
    price: PRIMES_100_200[i % PRIMES_100_200.length] ?? 101,
  }));

  await db.insert(books).values(bookData);
  console.log("Seed complete: Books added.");

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || adminPassword.length === 0) {
    console.log("ADMIN_PASSWORD not set; skipping admin user creation.");
    return;
  }

  const hashedPassword = await hash(adminPassword, 10);
  await db.insert(users).values({
    login: "admin",
    password: hashedPassword,
  });
  console.log("Admin user created (login: admin).");
}

seed();