import { Answer } from "@/domain/forum/enterprise/entities";
import { AnswersRepository } from "../../repositories/answers.repository";

interface FetchQuestionAnswersUseCaseInput {
  page: number;
  questionId: string;
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseInput): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.repository.findManyByQuestionId(questionId, {
      page,
    });

    return { answers };
  }
}
