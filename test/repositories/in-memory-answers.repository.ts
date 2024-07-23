import { AnswersRepository } from "@/domain/forum/application/repositories/answers.repository";
import { Answer } from "@/domain/forum/enterprise/entities";

export class InMemoryAnswersRepository implements AnswersRepository {
  private items: Answer[];

  constructor() {
    this.items = [];
  }
  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }
}
