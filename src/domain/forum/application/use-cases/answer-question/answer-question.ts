import { Answer } from "@/domain/forum/enterprise/entities";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";
import { AnswersRepository } from "../../repositories/answers.repository";

interface AnswerQuestionInput {
  authorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionResponse {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
  }: AnswerQuestionInput): Promise<AnswerQuestionResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.repository.create(answer);

    return { answer };
  }
}
