import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions.repository";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

describe("DeleteQuestionUseCase", () => {
  let repository: InMemoryQuestionsRepository;
  let sut: DeleteQuestionUseCase;

  beforeEach(() => {
    repository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(repository);
  });

  it("should be able to delete a question", async () => {
    const createQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    await repository.create(createQuestion);

    await sut.execute({
      questionId: createQuestion.id.toString(),
      authorId: "author-1",
    });

    expect(repository.items.length).toBe(0);
  });

  it("should not be able to delete a question if not found", async () => {
    await expect(() =>
      sut.execute({
        questionId: "invalid-id",
        authorId: "author-1",
      })
    ).rejects.toThrowError();
  });

  it("should not allow to delete a question if the authorId is different", async () => {
    const createQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    await repository.create(createQuestion);

    await expect(() =>
      sut.execute({
        questionId: createQuestion.id.toString(),
        authorId: "wrong-author-id",
      })
    ).rejects.toThrowError();
  });
});
