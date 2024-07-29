import { AnswerCommentRepository } from "../../repositories/answer-comments.repository";

interface DeleteAnswerCommentInput {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private repository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentInput): Promise<DeleteAnswerCommentResponse> {
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
