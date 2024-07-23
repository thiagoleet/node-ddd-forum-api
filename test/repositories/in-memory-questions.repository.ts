import { QuestionsRepository } from "@/domain/forum/application/repositories/questions.repository";
import { Question } from "@/domain/forum/enterprise/entities";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private _items: Question[];

  get items(): Question[] {
    return this._items;
  }

  constructor() {
    this._items = [];
  }
  async create(question: Question): Promise<void> {
    this._items.push(question);
  }
}
