import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions.repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionCommentssRepository } from "test/repositories/in-memory-question-comments.repository";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

describe("CommentOnQuestionUseCase", () => {
  let questionCommentsRepository: InMemoryQuestionCommentssRepository;
  let questionsRepository: InMemoryQuestionsRepository;
  let sut: CommentOnQuestionUseCase;

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentssRepository();
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new CommentOnQuestionUseCase(
      questionCommentsRepository,
      questionsRepository
    );
  });

  it("should be able to comment on a question", async () => {
    const question = makeQuestion({}, new UniqueEntityID("question-id"));
    questionsRepository.items.push(question);

    const { comment } = await sut.execute({
      authorId: "instructor-id",
      questionId: "question-id",
      content: "Content",
    });

    expect(comment.id).toBeTruthy();
    expect(questionCommentsRepository.items[0].id).toEqual(comment.id);
    expect(questionCommentsRepository.items[0].questionId).toEqual(question.id);
  });

  it("should not be able to comment on a question if it not exists/matches", async () => {
    await expect(() =>
      sut.execute({
        authorId: "instructor-id",
        questionId: "question-id",
        content: "Content",
      })
    ).rejects.toThrowError();
  });
});
