import { Slug, UniqueEntityID } from "./value-objects";
import { Entity } from "../../core/entities";

type QuestionProps = {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
};

export class Question extends Entity<QuestionProps> {}
