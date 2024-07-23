import { Slug, UniqueEntityID } from "./value-objects";
import { Entity } from "../../core/entities";
import { Optional } from "../../core/types/optional";

type QuestionProps = {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
};

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityID
  ): Question {
    const question = new Question({ ...props, createdAt: new Date() }, id);

    return question;
  }
}
