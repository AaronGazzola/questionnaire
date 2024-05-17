const questions = [
  // Scale questions
  {
    id: "1e0b1a57-b8a5-4b67-a1b5-1c47368a33ba",
    text: "How important is communication in a web developer?",
    type: "scale",
    options: null,
  },
  {
    id: "2f4c4e1b-3aaf-4b6b-8e68-8d4f2e7b0d2a",
    text: "How often do you require updates on project progress?",
    type: "scale",
    options: null,
  },
  {
    id: "3a7b6e7a-6a9c-4c57-8f77-1b6e7d7f2d4c",
    text: "How important is the location of the developer?",
    type: "scale",
    options: null,
  },
  {
    id: "4c5d7f3a-7a7e-4e9b-8d77-2b6e7f8d9c4f",
    text: "How important is it for the developer to have a portfolio?",
    type: "scale",
    options: null,
  },
  {
    id: "5d8f4a7b-8a7d-4b6c-9f68-3b6e7f8d9e5d",
    text: "How important is the developer’s ability to meet deadlines?",
    type: "scale",
    options: null,
  },
  // Multiple-choice questions
  {
    id: "6e9f5a8c-9b7e-4c6d-af78-4b7e8d9e6f6e",
    text: "Which programming languages do you prefer for web development?",
    type: "multiple-choice",
    options: JSON.stringify(["JavaScript", "Python", "Ruby", "PHP", "Other"]),
  },
  {
    id: "7f1a6b9d-ab8f-4d7e-bf89-5b8e9f7d7a7f",
    text: "Which web development frameworks do you prefer?",
    type: "multiple-choice",
    options: JSON.stringify(["React", "Vue", "Angular", "Svelte", "Other"]),
  },
  {
    id: "8a2b7c1e-bc9f-4e8f-cf9a-6c9e8d8e8b8a",
    text: "Which type of web projects do you usually have?",
    type: "multiple-choice",
    options: JSON.stringify([
      "E-commerce",
      "Blogs",
      "Corporate",
      "Portfolio",
      "Other",
    ]),
  },
  {
    id: "9b3c8d2f-cd8f-4f9f-df9b-7d9e9d8f9c9b",
    text: "How many years of experience do you expect the developer to have?",
    type: "multiple-choice",
    options: JSON.stringify(["0-1", "1-3", "3-5", "5-10", "10+"]),
  },
  {
    id: "0c4d9e3f-de9f-5f8f-efab-8e9f8e9d0d0a",
    text: "Which design tools do you prefer your developers to use?",
    type: "multiple-choice",
    options: JSON.stringify([
      "Figma",
      "Sketch",
      "Adobe XD",
      "InVision",
      "Other",
    ]),
  },
];

const users = [
  { id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa" },
  { id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2" },
  { id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6" },
];

const answers = [
  // User 1 answers
  {
    question_id: "1e0b1a57-b8a5-4b67-a1b5-1c47368a33ba",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: 5 }),
  },
  {
    question_id: "2f4c4e1b-3aaf-4b6b-8e68-8d4f2e7b0d2a",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: 4 }),
  },
  {
    question_id: "3a7b6e7a-6a9c-4c57-8f77-1b6e7d7f2d4c",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: 3 }),
  },
  {
    question_id: "4c5d7f3a-7a7e-4e9b-8d77-2b6e7f8d9c4f",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: 4 }),
  },
  {
    question_id: "5d8f4a7b-8a7d-4b6c-9f68-3b6e7f8d9e5d",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: 5 }),
  },
  {
    question_id: "6e9f5a8c-9b7e-4c6d-af78-4b7e8d9e6f6e",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: "JavaScript" }),
  },
  {
    question_id: "7f1a6b9d-ab8f-4d7e-bf89-5b8e9f7d7a7f",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: "React" }),
  },
  {
    question_id: "8a2b7c1e-bc9f-4e8f-cf9a-6c9e8d8e8b8a",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: "E-commerce" }),
  },
  {
    question_id: "9b3c8d2f-cd8f-4f9f-df9b-7d9e9d8f9c9b",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: "3-5" }),
  },
  {
    question_id: "0c4d9e3f-de9f-5f8f-efab-8e9f8e9d0d0a",
    user_id: "1e3f5a79-b6e2-4f11-b69a-f0ad74e1d8fa",
    answer: JSON.stringify({ value: "Figma" }),
  },

  // User 2 answers
  {
    question_id: "1e0b1a57-b8a5-4b67-a1b5-1c47368a33ba",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: 4 }),
  },
  {
    question_id: "2f4c4e1b-3aaf-4b6b-8e68-8d4f2e7b0d2a",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: 3 }),
  },
  {
    question_id: "3a7b6e7a-6a9c-4c57-8f77-1b6e7d7f2d4c",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: 4 }),
  },
  {
    question_id: "4c5d7f3a-7a7e-4e9b-8d77-2b6e7f8d9c4f",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: 3 }),
  },
  {
    question_id: "5d8f4a7b-8a7d-4b6c-9f68-3b6e7f8d9e5d",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: 4 }),
  },
  {
    question_id: "6e9f5a8c-9b7e-4c6d-af78-4b7e8d9e6f6e",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: "Python" }),
  },
  {
    question_id: "7f1a6b9d-ab8f-4d7e-bf89-5b8e9f7d7a7f",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: "Vue" }),
  },
  {
    question_id: "8a2b7c1e-bc9f-4e8f-cf9a-6c9e8d8e8b8a",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: "Corporate" }),
  },
  {
    question_id: "9b3c8d2f-cd8f-4f9f-df9b-7d9e9d8f9c9b",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: "1-3" }),
  },
  {
    question_id: "0c4d9e3f-de9f-5f8f-efab-8e9f8e9d0d0a",
    user_id: "2a7e9d79-c8e4-4d62-8c69-d6c5d5c5a4b2",
    answer: JSON.stringify({ value: "Sketch" }),
  },

  // User 3 answers
  {
    question_id: "1e0b1a57-b8a5-4b67-a1b5-1c47368a33ba",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: 3 }),
  },
  {
    question_id: "2f4c4e1b-3aaf-4b6b-8e68-8d4f2e7b0d2a",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: 2 }),
  },
  {
    question_id: "3a7b6e7a-6a9c-4c57-8f77-1b6e7d7f2d4c",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: 4 }),
  },
  {
    question_id: "4c5d7f3a-7a7e-4e9b-8d77-2b6e7f8d9c4f",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: 4 }),
  },
  {
    question_id: "5d8f4a7b-8a7d-4b6c-9f68-3b6e7f8d9e5d",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: 3 }),
  },
  {
    question_id: "6e9f5a8c-9b7e-4c6d-af78-4b7e8d9e6f6e",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: "Ruby" }),
  },
  {
    question_id: "7f1a6b9d-ab8f-4d7e-bf89-5b8e9f7d7a7f",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: "Angular" }),
  },
  {
    question_id: "8a2b7c1e-bc9f-4e8f-cf9a-6c9e8d8e8b8a",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: "Blogs" }),
  },
  {
    question_id: "9b3c8d2f-cd8f-4f9f-df9b-7d9e9d8f9c9b",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: "5-10" }),
  },
  {
    question_id: "0c4d9e3f-de9f-5f8f-efab-8e9f8e9d0d0a",
    user_id: "3c8e1d6b-d5f6-4f29-9b7d-f8a7e9d1e5f6",
    answer: JSON.stringify({ value: "Adobe XD" }),
  },
];

module.exports = {
  questions,
  users,
  answers,
};
