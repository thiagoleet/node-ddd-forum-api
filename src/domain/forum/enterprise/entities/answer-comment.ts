import { Entity } from "@/core/entities";
import { UniqueEntityID } from "./value-objects";
import { Optional } from "@/core/types/optional";

export type AnswerCommentProps = {
  authorId: UniqueEntityID;
  answerId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class AnswerComment extends Entity<AnswerCommentProps> {
  get authorId() {
    return this.props.authorId;
  }

  get answerId() {
    return this.props.answerId;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<AnswerCommentProps, "createdAt">,
    id?: UniqueEntityID
  ): AnswerComment {
    const answer = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return answer;
  }
}
