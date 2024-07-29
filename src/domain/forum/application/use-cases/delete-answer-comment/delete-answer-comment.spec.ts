import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments.repository";
import { makeAnswerComment } from "test/factories/make-answer-comment";

describe("DeleteAnswerCommentUseCase", () => {
  let repository: InMemoryAnswerCommentsRepository;
  let sut: DeleteAnswerCommentUseCase;

  beforeEach(() => {
    repository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(repository);
  });

  it("should be able to delete a comment on a answer", async () => {
    const comment = makeAnswerComment(
      {
        authorId: new UniqueEntityID("author-id"),
      },
      new UniqueEntityID("comment-id")
    );
    repository.items.push(comment);

    await sut.execute({
      authorId: "author-id",
      answerCommentId: "comment-id",
    });

    expect(repository.items).toHaveLength(0);
  });

  it("should not be able to delete a comment on a answer if it not exists/matches", async () => {
    await expect(() =>
      sut.execute({
        authorId: "author-id",
        answerCommentId: "answer-id",
      })
    ).rejects.toThrowError();
  });

  it("should not be able to delete another user answer comment", async () => {
    const comment = makeAnswerComment(
      { authorId: new UniqueEntityID("author-id") },
      new UniqueEntityID("comment-id")
    );
    repository.items.push(comment);

    await expect(() =>
      sut.execute({
        authorId: "wrong-author-id",
        answerCommentId: "answer-id",
      })
    ).rejects.toThrowError();
  });
});
