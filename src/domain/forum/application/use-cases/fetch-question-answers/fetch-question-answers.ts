import { Answer } from "@/domain/forum/enterprise/entities";
import { AnswersRepository } from "../../repositories/answers.repository";

type FetchQuestionAnswersUseCaseInput = {
  page: number;
  questionId: string;
};

type FetchQuestionAnswersUseCaseResponse = {
  answers: Answer[];
};

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
