import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments.repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities";

export class InMemoryQuestionCommentssRepository
  implements QuestionCommentRepository
{
  items: QuestionComment[] = [];

  async create(comment: QuestionComment): Promise<void> {
    this.items.push(comment);
  }
}
