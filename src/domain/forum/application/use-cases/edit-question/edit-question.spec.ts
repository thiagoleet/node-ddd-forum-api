import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions.repository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

describe("EditQuestionUseCase", () => {
  let repository: InMemoryQuestionsRepository;
  let sut: EditQuestionUseCase;

  beforeEach(() => {
    repository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(repository);
  });

  it("should be able to edit a question", async () => {
    const createQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    await repository.create(createQuestion);

    await sut.execute({
      questionId: createQuestion.id.toString(),
      authorId: "author-1",
      title: "New Title",
      content: "New Content",
    });

    expect(repository.items[0]).toMatchObject({
      title: "New Title",
      content: "New Content",
    });
  });

  it("should not be able to edit a question if not found", async () => {
    await expect(() =>
      sut.execute({
        questionId: "invalid-id",
        authorId: "author-1",
        title: "New Title",
        content: "New Content",
      })
    ).rejects.toThrowError();
  });

  it("should not allow to edit a question if the authorId is different", async () => {
    const createQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    await repository.create(createQuestion);

    await expect(() =>
      sut.execute({
        questionId: createQuestion.id.toString(),
        authorId: "wrong-author-id",
        title: "New Title",
        content: "New Content",
      })
    ).rejects.toThrowError();
  });
});
