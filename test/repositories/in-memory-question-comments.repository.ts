import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments.repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities";

export class InMemoryQuestionCommentssRepository
  implements QuestionCommentRepository
{
  items: QuestionComment[] = [];

  async create(comment: QuestionComment): Promise<void> {
    this.items.push(comment);
  }

  async findById(id: string): Promise<QuestionComment | null> {
    return this.items.find((comment) => comment.id.toString() === id) ?? null;
  }

  async delete(comment: QuestionComment): Promise<void> {
    this.items = this.items.filter(
      (item) => item.id.toString() !== comment.id.toString()
    );
  }
}
