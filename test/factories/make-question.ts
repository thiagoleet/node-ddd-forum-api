import { faker } from "@faker-js/faker";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

export function makeQuestion(
  overide: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID("instructor-id"),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...overide,
    },
    id
  );

  return question;
}
