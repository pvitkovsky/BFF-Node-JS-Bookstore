import { db } from "./index";
import { books } from "./schema";

const PRIMES_100_200 = [101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];

const titles = [
  "War and Peace", "Pride and Prejudice", "Alice in Wonderland", "Hamlet", 
  "Decameron", "The Odyssey", "Catch-22", "Buddha's Little Finger", 
  "Sapiens", "Structure And Implementation Of Computer Programs", 
  "Microsoft Office '97", "Rocket Science For Dummies"
];

async function seed() {
  const bookData = titles.map((title, i) => ({
    title,
    year: 1900 + i, // Dummy years
    isbn: `978-3-16-14841${i}-0`,
    price: PRIMES_100_200[i % PRIMES_100_200.length] ?? 101,
  }));

  await db.insert(books).values(bookData);
  console.log("Seed complete: Books added, Users left empty.");
}

seed();