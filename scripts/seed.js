const { db } = require("@vercel/postgres");
const { questions, answers, users } = require("../app/lib/seed-data.js");

async function seedQuestions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`DROP TABLE IF EXISTS "Question" CASCADE`;

    await client.sql`
      CREATE TABLE "Question" (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        text TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        options TEXT[] NOT NULL
      );
    `;

    await Promise.all(
      questions.map(
        (question) =>
          client.sql`
          INSERT INTO "Question" (id, text, type, options)
          VALUES (${question.id}, ${question.text}, ${question.type}, ${question.options})
        `
      )
    );
  } catch (error) {
    console.error("Error seeding questions:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS "User" CASCADE`;

    await client.sql`
      CREATE TABLE "User" (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL
      );
    `;

    await Promise.all(
      users.map(
        (user) =>
          client.sql`
          INSERT INTO "User" (id, name)
          VALUES (${user.id}, ${user.name})
        `
      )
    );
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedAnswers(client) {
  try {
    await client.sql`DROP TABLE IF EXISTS "Answer" CASCADE`;

    await client.sql`
      CREATE TABLE "Answer" (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        question_id UUID NOT NULL REFERENCES "Question"(id),
        user_id UUID NOT NULL REFERENCES "User"(id),
        answer TEXT NOT NULL
      );
    `;

    await Promise.all(
      answers.map(
        (answer) =>
          client.sql`
          INSERT INTO "Answer" (id, question_id, user_id, answer)
          VALUES (uuid_generate_v4(), ${answer.question_id}, ${answer.user_id}, ${answer.answer})
        `
      )
    );
  } catch (error) {
    console.error("Error seeding answers:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await client.sql`BEGIN`;
    await seedQuestions(client);
    await seedUsers(client);
    await seedAnswers(client);
    await client.sql`COMMIT`;
  } catch (err) {
    console.error(
      "An error occurred while attempting to seed the database:",
      err
    );
    await client.sql`ROLLBACK`;
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
