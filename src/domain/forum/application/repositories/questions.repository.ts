import { Question } from "../../enterprise/entities";

export interface QuestionsRepository {
  create(question: Question): Promise<void>;
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
}
