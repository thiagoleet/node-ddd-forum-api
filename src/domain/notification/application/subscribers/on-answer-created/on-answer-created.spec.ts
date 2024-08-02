import { makeAnswer } from "test/factories/forum/make-answer";
import { OnAnswerCreated } from "./on-answer-created";
import { InMemoryAnswersRepository } from "test/repositories/forum/in-memory-answers.repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/forum/in-memory-answer-attachments.repository";

describe("OnAnswerCreated", () => {
  let repository: InMemoryAnswersRepository;
  let attachmentsRepository: InMemoryAnswerAttachmentsRepository;

  beforeEach(() => {
    attachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    repository = new InMemoryAnswersRepository(attachmentsRepository);
  });

  it("should send a notification when an answer is created", async () => {
    const _handler = new OnAnswerCreated();
    const answer = makeAnswer();

    await repository.create(answer);
  });
});
