import { DomainEvents, EventHandler } from "@/core/events";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events";

export class OnAnswerCreated implements EventHandler {
  constructor() {
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
    console.log("New answer created", event.answer);
  }
}
