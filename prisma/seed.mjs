import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.review.deleteMany();
  await prisma.article.deleteMany();
  await prisma.journal.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = bcrypt.hashSync("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@university.edu",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const author = await prisma.user.create({
    data: {
      name: "Dr. Jane Smith",
      email: "jane.smith@university.edu",
      password: hashedPassword,
      role: "AUTHOR",
    },
  });

  const reviewer = await prisma.user.create({
    data: {
      name: "Prof. Alan Turing",
      email: "alan.turing@university.edu",
      password: hashedPassword,
      role: "REVIEWER",
    },
  });

  const journal = await prisma.journal.create({
    data: {
      title: "International Journal of Quantum Computing",
      description:
        "Peer-reviewed research leading the way in quantum breakthroughs.",
      eissn: "1234-5678",
      pissn: "8765-4321",
      creatorId: author.id,
    },
  });

  await prisma.article.create({
    data: {
      title: "Error Correction in Superconducting Qubits",
      abstract:
        "This paper presents a novel approach to error correction in quantum circuits...",
      content: "Full text content of the article...",
      status: "PUBLISHED",
      authorId: author.id,
      journalId: journal.id,
    },
  });

  await prisma.article.create({
    data: {
      title: "Advancements in Photonic Quantum Information processing",
      abstract:
        "A deep dive into the use of photons over electrons for higher fidelity...",
      content: "Full text content of the article...",
      status: "UNDER_REVIEW",
      authorId: author.id,
      journalId: journal.id,
      reviews: {
        create: {
          reviewerId: reviewer.id,
          comments: "Interesting approach but needs more empirical data.",
          decision: "REVISE",
          status: "COMPLETED",
        },
      },
    },
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
