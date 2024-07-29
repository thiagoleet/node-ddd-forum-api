import { QuestionCommentRepository } from "../../repositories/question-comments.repository";

interface DeleteQuestionCommentUseCaseInput {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private repository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseInput): Promise<DeleteQuestionCommentUseCaseResponse> {
    const comment = await this.repository.findById(questionCommentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error("Not Allowed");
    }

    await this.repository.delete(comment);

    return {};
  }
}
