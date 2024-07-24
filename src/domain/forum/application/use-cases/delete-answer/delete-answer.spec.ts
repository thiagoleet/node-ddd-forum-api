import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";
import { DeleteAnswerUseCase } from "./delete-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers.repository";
import { makeAnswer } from "test/factories/make-answer";

describe("DeleteAnswerUseCase", () => {
  let repository: InMemoryAnswersRepository;
  let sut: DeleteAnswerUseCase;

  beforeEach(() => {
    repository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(repository);
  });

  it("should be able to delete an  answer", async () => {
    const createAnswer = makeAnswer({
      authorId: new UniqueEntityID("author-1"),
    });
    await repository.create(createAnswer);

    await sut.execute({
      answerId: createAnswer.id.toString(),
      authorId: "author-1",
    });

    expect(repository.items.length).toBe(0);
  });

  it("should not be able to delete an answer if not found", async () => {
    await expect(() =>
      sut.execute({
        answerId: "invalid-id",
        authorId: "author-1",
      })
    ).rejects.toThrowError();
  });

  it("should not allow to delete an answer if the authorId is different", async () => {
    const createQuestion = makeAnswer({
      authorId: new UniqueEntityID("author-1"),
    });
    await repository.create(createQuestion);

    await expect(() =>
      sut.execute({
        answerId: createQuestion.id.toString(),
        authorId: "wrong-author-id",
      })
    ).rejects.toThrowError();
  });
});
