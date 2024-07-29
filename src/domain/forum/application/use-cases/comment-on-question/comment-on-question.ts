import { QuestionComment } from "@/domain/forum/enterprise/entities";
import { QuestionsRepository } from "../../repositories/questions.repository";
import { QuestionCommentRepository } from "../../repositories/question-comments.repository";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";

interface CommentOnQuestionUseCaseInput {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  comment: QuestionComment;
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentRepository,
    private questionsRepository: QuestionsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseInput): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    const comment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: question.id,
      content,
    });

    await this.questionCommentsRepository.create(comment);

    return { comment };
  }
}
