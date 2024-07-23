import { Entity } from "../../core/entities";
import { UniqueEntityID } from "./value-objects";

type AnswerProps = {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content;
  }
}
