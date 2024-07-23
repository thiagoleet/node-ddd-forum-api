import dayjs from "dayjs";
import { Entity } from "@/core/entities";
import { Optional } from "@/core/types/optional";
import { Slug, UniqueEntityID } from "./value-objects";

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
  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, "days") <= 3;
  }

  set title(value: string) {
    this.props.title = value;
    this.props.slug = Slug.createFromText(value);
    this.touch();
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  set bestAnswerId(value: UniqueEntityID | undefined) {
    this.props.bestAnswerId = value;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityID
  ): Question {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id
    );

    return question;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
