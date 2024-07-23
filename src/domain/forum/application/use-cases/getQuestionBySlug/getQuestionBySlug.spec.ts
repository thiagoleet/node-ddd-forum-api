import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions.repository";
import { GetQuestionBySlugUseCase } from "./getQuestionBySlug";
import { Question } from "@/domain/forum/enterprise/entities";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

describe("GetQuestionBySlugUseCase", () => {
  let repository: InMemoryQuestionsRepository;
  let sut: GetQuestionBySlugUseCase;

  beforeEach(() => {
    repository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(repository);
  });

  it("should be able to get a question by slug", async () => {
    const createQuestion = Question.create({
      title: "New Question",
      content: "Content",
      authorId: new UniqueEntityID("instructor-id"),
    });

    await repository.create(createQuestion);

    const { question } = await sut.execute({
      slug: "new-question",
    });

    expect(question.slug.value).toBe("new-question");
  });

  it("should not be able to get a question by slug", async () => {
    await expect(() =>
      sut.execute({
        slug: "new-question",
      })
    ).rejects.toThrowError();
  });
});
