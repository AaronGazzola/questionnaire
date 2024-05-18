import { fetchQuestions } from "./lib/actions";
import Questionnaire from "./ui/Questionnaire";

export default async function Home() {
  const questions = await fetchQuestions();
  return (
    <main className="">
      <Questionnaire questions={questions} />
    </main>
  );
}
