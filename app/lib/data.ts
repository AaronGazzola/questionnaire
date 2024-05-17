import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

export async function fetchQuestions() {
  noStore();
  try {
    const questions = await prisma.question.findMany();
    return questions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions.");
  } finally {
    await prisma.$disconnect();
  }
}
