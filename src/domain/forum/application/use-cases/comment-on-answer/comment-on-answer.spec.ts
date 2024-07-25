import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers.repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments.repository";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";
import { makeAnswer } from "test/factories/make-answer";

describe("CommentOnAnswerUseCase", () => {
  let answerCommentsRepository: InMemoryAnswerCommentsRepository;
  let answersRepository: InMemoryAnswersRepository;
  let sut: CommentOnAnswerUseCase;

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository();
    answersRepository = new InMemoryAnswersRepository();
    sut = new CommentOnAnswerUseCase(
      answerCommentsRepository,
      answersRepository
    );
  });

  it("should be able to comment on an answer", async () => {
    const answer = makeAnswer({}, new UniqueEntityID("answer-id"));
    answersRepository.items.push(answer);

    const { comment } = await sut.execute({
      authorId: "instructor-id",
      answerId: "answer-id",
      content: "Content",
    });

    expect(comment.id).toBeTruthy();
    expect(answerCommentsRepository.items[0].id).toEqual(comment.id);
    expect(answerCommentsRepository.items[0].answerId).toEqual(answer.id);
  });

  it("should not be able to comment on an answer if it not exists/matches", async () => {
    await expect(() =>
      sut.execute({
        authorId: "instructor-id",
        answerId: "answer-id",
        content: "Content",
      })
    ).rejects.toThrowError();
  });
});
