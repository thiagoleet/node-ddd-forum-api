import { WatchedList } from "@/core/entities";
import { AnswerAttachment } from "./answer-attachment";

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId === b.attachmentId;
  }
}
