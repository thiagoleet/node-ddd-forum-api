import { QuestionsRepository } from "../../repositories/questions.repository";

type EditQuestionUseCaseInput = {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
};

type EditQuestionUseCaseResponse = {};

export class EditQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseInput): Promise<EditQuestionUseCaseResponse> {
    const question = await this.repository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (authorId != question.authorId.toString()) {
      throw new Error("Not Allowed");
    }

    question.title = title;
    question.content = content;

    await this.repository.save(question);

    return {};
  }
}
