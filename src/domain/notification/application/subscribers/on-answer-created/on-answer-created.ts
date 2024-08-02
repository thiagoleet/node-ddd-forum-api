import { DomainEvents, EventHandler } from "@/core/events";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions.repository";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events";
import { SendNotificationUseCase } from "../../use-cases/send-notification";

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async sendNewAnswerNotification(
    event: AnswerCreatedEvent
  ): Promise<void> {
    const { answer } = event;
    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (question) {
      await this.sendNotification.execute({
        receipientId: question.authorId.toString(),
        title: `New answer to ${question.title.substring(0, 40).concat("…")}`,
        content: answer.excerpt,
      });
    }
  }
}
