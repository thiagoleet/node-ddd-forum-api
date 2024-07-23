import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers.repository";
import { Answer } from "../entities";

const mockAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
};

test("create an answer question", async () => {
  const answeQuestion = new AnswerQuestionUseCase(mockAnswersRepository);

  const answer = await answeQuestion.execute({
    questionId: "question-id",
    authorId: "instructor-id",
    content: "New Answer",
  });

  expect(answer.content).toBe("New Answer");
});
