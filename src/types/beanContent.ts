import { Comment } from "./comment";

export interface BeanContent {
  uuid: string;
  content: string;
  beanName: string;
  companyName: string;
  userName: string;
  email: string;
  timeStamp: string;
  imageName: string;
  comments?: Comment[];
  commentedUsers: string[]; //uuids of users who commented on the bean
  rating: string;
  numReviews: string;
}
