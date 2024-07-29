import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers.repository";
import { AnswerQuestionUseCase } from ".";
import { Answer } from "@/domain/forum/enterprise/entities";

describe("AnswerQuestionUseCase", () => {
  let repository: InMemoryAnswersRepository;
  let sut: AnswerQuestionUseCase;

  beforeEach(() => {
    repository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(repository);
  });

  test("create an answer question", async () => {
    const result = await sut.execute({
      questionId: "question-id",
      authorId: "instructor-id",
      content: "New Answer",
    });

    const { answer } = result.value as { answer: Answer };

    expect(answer.content).toBe("New Answer");
    expect(repository.items[0].id).toEqual(answer.id);
  });
});
