import { QuestionsRepository } from "../../repositories/questions.repository";
import { CreateQuestionUseCase } from "./create-question";

const mockAnswersRepository: QuestionsRepository = {
  create: async () => {},
};

test("create an answer question", async () => {
  const createQuestion = new CreateQuestionUseCase(mockAnswersRepository);

  const { question } = await createQuestion.execute({
    authorId: "instructor-id",
    title: "New Question",
    content: "Content",
  });

  expect(question.id).toBeTruthy();
});
