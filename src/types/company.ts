import { BeanContent } from "./beanContent";

export interface Company {
  uuid: string;
  companyName: string;
  emails?: string[];
  accountType: CompanyTypes;
  numTotalReviews?: string;
  overallRating?: string;
}

export enum CompanyTypes {
  FREE = "free",
  PREMIUM = "premium",
}
