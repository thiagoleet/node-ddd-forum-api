import { QuestionsRepository } from "../../repositories/questions.repository";

type DeleteQuestionUseCaseInput = {
  authorId: string;
  questionId: string;
};

type DeleteQuestionUseCaseResponse = {};

export class DeleteQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseInput): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.repository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId != question.authorId.toString()) {
      throw new Error("Not Allowed");
    }

    await this.repository.delete(question);

    return {};
  }
}
