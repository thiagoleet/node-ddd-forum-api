import { Entity } from "@/core/entities";
import { UniqueEntityID } from "./value-objects";

interface AnswerAttachmentProps {
  answerId: UniqueEntityID;
  attachmentId: UniqueEntityID;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  getAnswerId() {
    return this.props.answerId;
  }

  getAttachmentId() {
    return this.props.attachmentId;
  }

  static create(
    props: AnswerAttachmentProps,
    id?: UniqueEntityID
  ): AnswerAttachment {
    const attachment = new AnswerAttachment(props, id);

    return attachment;
  }

  private touch(): void {}
}
