import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers.repository";
import { AnswerQuestionUseCase } from ".";

describe("AnswerQuestionUseCase", () => {
  let repository: InMemoryAnswersRepository;
  let sut: AnswerQuestionUseCase;

  beforeEach(() => {
    repository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(repository);
  });

  test("create an answer question", async () => {
    const { answer } = await sut.execute({
      questionId: "question-id",
      authorId: "instructor-id",
      content: "New Answer",
    });

    expect(answer.content).toBe("New Answer");
    expect(repository.items[0].id).toEqual(answer.id);
  });
});
