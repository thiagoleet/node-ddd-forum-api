import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { InMemoryQuestionCommentssRepository } from "test/repositories/in-memory-question-comments.repository";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";
import { makeQuestionComment } from "test/factories/make-question-comment";

describe("DeleteQuestionCommentUseCase", () => {
  let repository: InMemoryQuestionCommentssRepository;
  let sut: DeleteQuestionCommentUseCase;

  beforeEach(() => {
    repository = new InMemoryQuestionCommentssRepository();
    sut = new DeleteQuestionCommentUseCase(repository);
  });

  it("should be able to delete a comment on a question", async () => {
    const comment = makeQuestionComment(
      {
        authorId: new UniqueEntityID("author-id"),
      },
      new UniqueEntityID("comment-id")
    );
    repository.items.push(comment);

    await sut.execute({
      authorId: "author-id",
      questionCommentId: "comment-id",
    });

    expect(repository.items).toHaveLength(0);
  });

  it("should not be able to delete a comment on a question if it not exists/matches", async () => {
    await expect(() =>
      sut.execute({
        authorId: "author-id",
        questionCommentId: "question-id",
      })
    ).rejects.toThrowError();
  });

  it("should not be able to delete another user question comment", async () => {
    const comment = makeQuestionComment(
      { authorId: new UniqueEntityID("author-id") },
      new UniqueEntityID("comment-id")
    );
    repository.items.push(comment);

    await expect(() =>
      sut.execute({
        authorId: "wrong-author-id",
        questionCommentId: "question-id",
      })
    ).rejects.toThrowError();
  });
});
