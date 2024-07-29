import { AnswerCommentRepository } from "../../repositories/answer-comments.repository";

interface DeleteAnswerCommentUseCaseInput {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private repository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseInput): Promise<DeleteAnswerCommentUseCaseResponse> {
    const comment = await this.repository.findById(answerCommentId);

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
