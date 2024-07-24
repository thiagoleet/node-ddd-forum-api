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

  async delete(question: Question): Promise<void> {
    this._items = this._items.filter((item) => item.id !== question.id);
  }

  async findById(id: string): Promise<Question | null> {
    return this._items.find((question) => question.id.toValue() === id) || null;
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this._items.find((question) => question.slug.value === slug) || null;
  }
}
