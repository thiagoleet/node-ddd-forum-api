import { UniqueEntityID } from "../../domain/entities/value-objects";

export class Entity<Props> {
  private _id: UniqueEntityID;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this._id = new UniqueEntityID(id);
    this.props = props;
  }
}
