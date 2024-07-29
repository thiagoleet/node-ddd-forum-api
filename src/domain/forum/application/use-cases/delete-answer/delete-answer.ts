import { AnswersRepository } from "../../repositories/answers.repository";

interface DeleteAnswerInput {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerResponse {}

export class DeleteAnswerUseCase {
  constructor(private repository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerInput): Promise<DeleteAnswerResponse> {
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
