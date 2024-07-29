import {
  calculateOffset,
  ITEMS_PER_PAGE,
  PaginationParams,
} from "@/core/repositories/pagination-params";
import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comments.repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities";

export class InMemoryQuestionCommentsRepository
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

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComment[]> {
    const comments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice(...calculateOffset(params.page, ITEMS_PER_PAGE));

    return comments;
  }
}
