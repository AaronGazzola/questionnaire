const { db } = require("@vercel/postgres");
const { questions, answers, users } = require("../app/lib/placeholder-data.js");

async function seedQuestions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "questions" table if it exists
    await client.sql`DROP TABLE IF EXISTS questions CASCADE`;

    // Create the "questions" table
    const createTable = await client.sql`
      CREATE TABLE questions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        text TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        options JSONB
      );
    `;

    console.log(`Created "questions" table`);

    // Insert data into the "questions" table
    const insertedQuestions = await Promise.all(
      questions.map(
        (question) => client.sql`
        INSERT INTO questions (id, text, type, options)
        VALUES (${question.id}, ${question.text}, ${question.type}, ${question.options}::jsonb)
        RETURNING *;
      `
      )
    );

    console.log(`Seeded ${insertedQuestions.length} questions`);

    return {
      createTable,
      questions: insertedQuestions,
    };
  } catch (error) {
    console.error("Error seeding questions:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    // Drop the "users" table if it exists
    await client.sql`DROP TABLE IF EXISTS users CASCADE`;

    // Create the "users" table
    const createTable = await client.sql`
      CREATE TABLE users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(
        (user) => client.sql`
        INSERT INTO users (id)
        VALUES (${user.id})
        RETURNING *;
      `
      )
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedAnswers(client) {
  try {
    // Drop the "answers" table if it exists
    await client.sql`DROP TABLE IF EXISTS answers CASCADE`;

    // Create the "answers" table
    const createTable = await client.sql`
      CREATE TABLE answers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        question_id UUID NOT NULL REFERENCES questions(id),
        user_id UUID NOT NULL REFERENCES users(id),
        answer JSONB NOT NULL
      );
    `;

    console.log(`Created "answers" table`);

    // Insert data into the "answers" table
    const insertedAnswers = await Promise.all(
      answers.map(
        (answer) => client.sql`
        INSERT INTO answers (id, question_id, user_id, answer)
        VALUES (uuid_generate_v4(), ${answer.question_id}, ${answer.user_id}, ${answer.answer}::jsonb)
        RETURNING *;
      `
      )
    );

    console.log(`Seeded ${insertedAnswers.length} answers`);

    return {
      createTable,
      answers: insertedAnswers,
    };
  } catch (error) {
    console.error("Error seeding answers:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedQuestions(client);
  await seedUsers(client);
  await seedAnswers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
