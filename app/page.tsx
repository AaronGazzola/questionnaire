import { fetchQuestions } from "./lib/data";

export default async function Home() {
  const questions = await fetchQuestions();
  return <main className="">test</main>;
}
