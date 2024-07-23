import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions.repository";
import { QuestionsRepository } from "../../repositories/questions.repository";
import { CreateQuestionUseCase } from "./create-question";

describe("CreateQuestionUseCase", () => {
  let repository: QuestionsRepository;
  let sut: CreateQuestionUseCase;

  beforeEach(() => {
    repository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(repository);
  });

  it("should be able to create an answer question", async () => {
    const { question } = await sut.execute({
      authorId: "instructor-id",
      title: "New Question",
      content: "Content",
    });

    expect(question.id).toBeTruthy();
  });
});
