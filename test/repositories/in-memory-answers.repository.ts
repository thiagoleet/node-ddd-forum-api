import {
  calculateOffset,
  ITEMS_PER_PAGE,
  PaginationParams,
} from "@/core/repositories/pagination-params";
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

  async findById(id: string): Promise<Answer | null> {
    return this._items.find((answer) => answer.id.toString() === id) || null;
  }

  async delete(answer: Answer): Promise<void> {
    this._items = this._items.filter((item) => item.id !== answer.id);
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice(...calculateOffset(params.page, ITEMS_PER_PAGE));

    return answers;
  }
}
