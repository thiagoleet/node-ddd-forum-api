import { QuestionComment } from "../../enterprise/entities";

export interface QuestionCommentRepository {
  create(comment: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  delete(comment: QuestionComment): Promise<void>;
}
