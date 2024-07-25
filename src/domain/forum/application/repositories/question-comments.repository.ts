import { QuestionComment } from "../../enterprise/entities";

export interface QuestionCommentRepository {
  create(comment: QuestionComment): Promise<void>;
}
