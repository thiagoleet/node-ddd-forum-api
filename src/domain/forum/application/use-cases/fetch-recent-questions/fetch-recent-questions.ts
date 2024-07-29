import { Question } from "@/domain/forum/enterprise/entities";
import { QuestionsRepository } from "../../repositories/questions.repository";

interface FetchRecentQuestionsUseCaseInput {
  page: number;
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[];
  page: number;
}

export class FetchRecentQuestionsUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseInput): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.repository.findManyRecent({ page });

    return { questions, page };
  }
}
