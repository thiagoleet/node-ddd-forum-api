import { Question } from "@/domain/forum/enterprise/entities";
import { QuestionsRepository } from "../../repositories/questions.repository";

interface GetQuestionBySlugInput {
  slug: string;
}

interface GetQuestionBySlugResponse {
  question: Question;
}

export class GetQuestionBySlugUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugInput): Promise<GetQuestionBySlugResponse> {
    const question = await this.repository.findBySlug(slug);

    if (!question) {
      throw new Error("Question not found");
    }

    return { question };
  }
}
