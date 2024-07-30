import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from "@/domain/forum/enterprise/entities";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

export function makeAnswerAttachment(
  overide: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const attachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityID("answer-id"),
      attachmentId: new UniqueEntityID("attachment-id"),
      ...overide,
    },
    id
  );

  return attachment;
}
