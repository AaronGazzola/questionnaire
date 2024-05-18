"use server";
import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { AnswerData } from "../ui/Questionnaire";

const prisma = new PrismaClient();

export async function getQuestions() {
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

export async function submitAnswers(name: string, answers: AnswerData[]) {
  noStore();
  try {
    const user = await prisma.user.create({
      data: {
        name,
        answers: {
          create: answers,
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit answers.");
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUsers() {
  noStore();
  try {
    const users = await prisma.user.findMany({
      include: {
        answers: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  } finally {
    await prisma.$disconnect();
  }
}
