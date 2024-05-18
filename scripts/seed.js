const { db } = require("@vercel/postgres");
const { questions, users } = require("../app/lib/seed-data.js");

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

async function main() {
  const client = await db.connect();

  try {
    await client.sql`BEGIN`;
    await seedQuestions(client);
    await seedUsers(client);
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
