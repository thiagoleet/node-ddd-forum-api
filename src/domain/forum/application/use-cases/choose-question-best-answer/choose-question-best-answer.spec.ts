import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers.repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions.repository";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";
import { makeAnswer } from "test/factories/make-answer";

describe("ChooseQuestionBestAnswerUseCase", () => {
  let questionsRepository: InMemoryQuestionsRepository;
  let answersRepository: InMemoryAnswersRepository;
  let sut: ChooseQuestionBestAnswerUseCase;

  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    answersRepository = new InMemoryAnswersRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      questionsRepository,
      answersRepository
    );
  });

  it("should be able to choose question best answer", async () => {
    const createQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    await questionsRepository.create(createQuestion);

    const createAnswer = makeAnswer({
      questionId: createQuestion.id,
    });
    await answersRepository.create(createAnswer);

    await sut.execute({
      answerId: createAnswer.id.toString(),
      authorId: "author-1",
    });

    expect(questionsRepository.items[0]).toMatchObject({
      bestAnswerId: createAnswer.id,
    });
  });

  it("should not be able to choose another user question best answer", async () => {
    const createQuestion = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    });
    await questionsRepository.create(createQuestion);

    const createAnswer = makeAnswer({
      questionId: createQuestion.id,
    });
    await answersRepository.create(createAnswer);

    await expect(() =>
      sut.execute({
        answerId: createAnswer.id.toString(),
        authorId: "wrong-author-id",
      })
    ).rejects.toThrowError();
  });

  it("should not be able to choose a non existent answer", async () => {
    await expect(() =>
      sut.execute({
        answerId: "invalid-id",
        authorId: "author-id",
      })
    ).rejects.toThrowError();
  });

  it("should not be able to choose an answer to a non existent question", async () => {
    const createAnswer = makeAnswer({
      questionId: new UniqueEntityID("question-id"),
    });
    await answersRepository.create(createAnswer);

    await expect(() =>
      sut.execute({
        answerId: createAnswer.id.toString(),
        authorId: "author-id",
      })
    ).rejects.toThrowError();
  });
});
