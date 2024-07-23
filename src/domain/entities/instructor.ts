import { Entity } from "../../core/entities";

type InstructorProps = {
  name: string;
};

export class Instructor extends Entity<InstructorProps> {}
