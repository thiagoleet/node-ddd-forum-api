import { AnswersRepository } from "@/domain/forum/application/repositories/answers.repository";
import { Answer } from "@/domain/forum/enterprise/entities";

export class InMemoryAnswersRepository implements AnswersRepository {
  private _items: Answer[];

  get items(): Answer[] {
    return this._items;
  }

  constructor() {
    this._items = [];
  }
  async create(answer: Answer): Promise<void> {
    this._items.push(answer);
  }
}
