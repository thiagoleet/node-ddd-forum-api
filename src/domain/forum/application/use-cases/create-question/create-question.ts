import { Question } from "@/domain/forum/enterprise/entities";
import { QuestionsRepository } from "../../repositories/questions.repository";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

interface CreateQuestionInput {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private repository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionInput): Promise<CreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    });

    await this.repository.create(question);

    return {
      question,
    };
  }
}
