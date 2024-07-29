import { QuestionComment } from "@/domain/forum/enterprise/entities";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";
import { QuestionsRepository } from "../../repositories/questions.repository";
import { QuestionCommentRepository } from "../../repositories/question-comments.repository";

interface CommentOnQuestionInput {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionResponse {
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
  }: CommentOnQuestionInput): Promise<CommentOnQuestionResponse> {
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
