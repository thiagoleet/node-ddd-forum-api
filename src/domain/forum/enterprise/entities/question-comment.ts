import { UniqueEntityID } from "./value-objects";
import { Optional } from "@/core/types/optional";
import { CommentProps, Comment } from "./comment";

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentProps, "createdAt">,
    id?: UniqueEntityID
  ): QuestionComment {
    const answer = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return answer;
  }
}
