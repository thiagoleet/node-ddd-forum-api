import { Entity } from "../../core/entities";
import { Optional } from "../../core/types/optional";
import { UniqueEntityID } from "./value-objects";

type AnswerProps = {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Answer extends Entity<AnswerProps> {
  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
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

  get excerpt(): string {
    return this.props.content.substring(0, 120).trimEnd().concat("...");
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityID
  ): Answer {
    const answer = new Answer({ ...props, createdAt: new Date() }, id);

    return answer;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
