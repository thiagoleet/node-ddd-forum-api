import { AnswerComment } from "../../enterprise/entities";

export interface AnswerCommentRepository {
  create(comment: AnswerComment): Promise<void>;
  findById(id: string): Promise<AnswerComment | null>;
  delete(comment: AnswerComment): Promise<void>;
}
