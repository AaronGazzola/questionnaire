import { Answer, User } from "@prisma/client";

export type UserWithAnswers = User & {
  answers: Answer[];
};
