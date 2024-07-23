import { Question } from "@/domain/forum/enterprise/entities";
import { QuestionsRepository } from "../../repositories/questions.repository";

type GetQuestionBySlugUseCaseInput = {
  slug: string;
};

type GetQuestionBySlugUseCaseResponse = {
  question: Question;
};

export class GetQuestionBySlugUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseInput): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.repository.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found");
    }

    return { question };
  }
}
