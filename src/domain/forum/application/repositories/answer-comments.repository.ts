import { AnswerComment } from "../../enterprise/entities";

export interface AnswerCommentRepository {
  create(comment: AnswerComment): Promise<void>;
}
