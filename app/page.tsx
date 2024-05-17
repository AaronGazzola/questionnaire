import { fetchQuestions } from "./lib/data";
import Questions from "./ui/Questions";

export default async function Home() {
  const questions = await fetchQuestions();
  return (
    <main className="">
      <Questions questions={questions} />
    </main>
  );
}
