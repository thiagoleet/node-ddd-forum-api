import { QuestionCommentRepository } from "../../repositories/question-comments.repository";

interface DeleteCommentOnQuestionUseCaseInput {
  authorId: string;
  questionCommentId: string;
}

interface DeleteCommentOnQuestionUseCaseResponse {}

export class DeleteCommentOnQuestionUseCase {
  constructor(private repository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteCommentOnQuestionUseCaseInput): Promise<DeleteCommentOnQuestionUseCaseResponse> {
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
