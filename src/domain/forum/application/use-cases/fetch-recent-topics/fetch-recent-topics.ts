import { Question } from "@/domain/forum/enterprise/entities";
import { QuestionsRepository } from "../../repositories/questions.repository";

type FetchRecentTopicsUseCaseInput = {
  page: number;
};

type FetchRecentTopicsUseCaseResponse = {
  questions: Question[];
  page: number;
};

export class FetchRecentTopicsUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentTopicsUseCaseInput): Promise<FetchRecentTopicsUseCaseResponse> {
    const questions = await this.repository.findManyRecent({ page });

    return { questions, page };
  }
}
