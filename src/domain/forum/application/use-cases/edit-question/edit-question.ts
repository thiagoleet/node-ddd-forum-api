import { QuestionsRepository } from "../../repositories/questions.repository";

interface EditQuestionInput {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionResponse {}

export class EditQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionInput): Promise<EditQuestionResponse> {
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
