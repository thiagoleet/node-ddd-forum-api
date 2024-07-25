import { AnswerComment } from "@/domain/forum/enterprise/entities";
import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects";
import { AnswersRepository } from "../../repositories/answers.repository";
import { AnswerCommentRepository } from "../../repositories/answer-comments.repository";

type CommentOnAnswerUseCaseInput = {
  authorId: string;
  answerId: string;
  content: string;
};

type CommentOnAnswerUseCaseResponse = {
  comment: AnswerComment;
};

export class CommentOnAnswerUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentRepository,
    private answerssRepository: AnswersRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseInput): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerssRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const comment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: answer.id,
      content,
    });

    await this.answerCommentsRepository.create(comment);

    return { comment };
  }
}
