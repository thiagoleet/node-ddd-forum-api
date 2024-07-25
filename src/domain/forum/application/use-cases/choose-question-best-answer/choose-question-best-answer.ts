import { Question } from "@/domain/forum/enterprise/entities";
import { QuestionsRepository } from "../../repositories/questions.repository";
import { AnswersRepository } from "../../repositories/answers.repository";

type ChooseQuestionBestAnswerUseCaseInput = {
  answerId: string;
  authorId: string;
};

type ChooseQuestionBestAnswerUseCaseResponse = {
  question: Question;
};

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseInput): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      throw new Error("Question not found");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("Not Allowed");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}
