import { BeanContent } from "./beanContent";

export interface Company {
  uuid: string;
  emails?: string[];
  type: CompanyTypes;
  numTotalReviews?: string;
  overallRating?: string;
  beanContents: BeanContent[];
}

export enum CompanyTypes {
  FREE = "free",
  PREMIUM = "premium",
}
