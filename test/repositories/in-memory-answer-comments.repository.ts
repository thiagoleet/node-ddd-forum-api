import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comments.repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentRepository
{
  items: AnswerComment[] = [];

  async create(comment: AnswerComment): Promise<void> {
    this.items.push(comment);
  }
}
