import { Comment } from "./comment";

export interface Account {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  beanPoint: string; // our reward point
  comments?: Comment[]; // comments a user has written
}
