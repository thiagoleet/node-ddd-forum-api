import {
  calculateOffset,
  ITEMS_PER_PAGE,
  PaginationParams,
} from "@/core/repositories/pagination-params";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments.repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentRepository
{
  items: AnswerComment[] = [];

  async create(comment: AnswerComment): Promise<void> {
    this.items.push(comment);
  }

  async findById(id: string): Promise<AnswerComment | null> {
    return this.items.find((comment) => comment.id.toString() === id) || null;
  }

  async delete(comment: AnswerComment): Promise<void> {
    this.items = this.items.filter((item) => item.id !== comment.id);
  }

  async findManyByAnswerId(
    answerId: string,
    params: PaginationParams
  ): Promise<AnswerComment[]> {
    const comments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice(...calculateOffset(params.page, ITEMS_PER_PAGE));

    return comments;
  }
}
