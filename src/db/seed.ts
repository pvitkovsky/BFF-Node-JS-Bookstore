import { hash } from "bcryptjs";
import { db } from "./index";
import { books, users } from "./schema";

const PRIMES_100_200 = [101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];

const titles = [{name: "War and Peace", year: 1869}, 
  {name: "Pride and Prejudice", year: 1813}, 
  {name: "Alice in Wonderland", year: 1865}, 
  {name: "Hamlet", year: 1600},
   {name: "Decameron", year: 1348}, 
   {name: "The Odyssey", year: -800}, 
   {name: "Catch-22", year: 1961}, 
   {name: "Buddha's Little Finger", year: 1995}, 
   {name: "Sapiens", year: 2011}, 
   {name: "Structure And Implementation Of Computer Programs", year: 1985}, 
   {name: "Microsoft Office '97", year: 1997}, 
   {name: "Rocket Science For Dummies", year: 2003}];

async function seed() {
  const bookData = titles.map((title, i) => ({
    title: title.name,
    year: title.year,
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