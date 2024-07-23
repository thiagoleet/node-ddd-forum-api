import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers.repository";

type AnswerQuestionUseCaseInput = {
  authorId: string;
  questionId: string;
  content: string;
};

export class AnswerQuestionUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseInput): Promise<Answer> {
    const answer = new Answer({ content, authorId, questionId });

    await this.repository.create(answer);

    return answer;
  }
}
