import { Comment } from "./comment";

export interface BeanContent {
  uuid: string;
  beanName: string;
  companyName: string;
  userId: string; // uuid of the user who posts a bean
  timeStamp: string;
  imageName: string;
  date?: string;
  headquarter?: string;
  numReviews: string;
  comments?: Comment[];
  commentedUsers?: string[]; //emails of users who commented on the bean
  avgRating?: string;
  ratings?: string[];
  content?: string;
}
