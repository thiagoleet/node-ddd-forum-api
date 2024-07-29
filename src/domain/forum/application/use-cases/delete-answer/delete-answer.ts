import { AnswersRepository } from "../../repositories/answers.repository";

interface DeleteAnswerUseCaseInput {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseInput): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.repository.findById(answerId);

    if (!answer) {
      throw new Error("Question not found");
    }

    if (authorId != answer.authorId.toString()) {
      throw new Error("Not Allowed");
    }

    await this.repository.delete(answer);

    return {};
  }
}
