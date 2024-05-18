import { getQuestions, getUsers } from "@/app/lib/actions";
import Results from "@/app/ui/Results";

const page = async ({
  params: { user_id },
}: {
  params: { user_id: string };
}) => {
  const questions = await getQuestions();
  const users = await getUsers();
  return (
    <Results
      users={users}
      questions={questions}
      user_id={user_id}
    />
  );
};

export default page;
