import { QuestionAttachment } from "../../enterprise/entities";

export interface QuestionAttachmentsRepository {
  create(attachment: QuestionAttachment): Promise<void>;
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}
