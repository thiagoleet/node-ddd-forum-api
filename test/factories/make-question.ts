import { Question, QuestionProps } from "@/domain/forum/enterprise/entities";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

export function makeQuetion(overide: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID("instructor-id"),
    title: "New Question",
    content: "Content",
    ...overide,
  });

  return question;
}
