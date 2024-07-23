import { Answer } from '@/domain/forum/enterprise/entities'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
