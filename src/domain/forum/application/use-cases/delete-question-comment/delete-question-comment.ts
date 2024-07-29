import { QuestionCommentRepository } from "../../repositories/question-comments.repository";

interface DeleteQuestionCommentInput {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private repository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentInput): Promise<DeleteQuestionCommentResponse> {
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
