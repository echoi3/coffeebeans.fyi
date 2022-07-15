export interface Comment {
  id: string; // uuid from BeanContent
  userName: string;
  timeStamp: string; // Month Year
  rating: string;
  comment: string;
  ratingDetails?: {
    body_mouthfeel?: string;
    acidity?: AcidityCategory;
    finish?: string;
    flavor?: string;
    aroma?: string;
  };
}

export enum AcidityCategory {
  NOT_ACIDIC = "Not Acidic",
  A_BIT_ACIDIC = "A Bit Acidic",
  ACIDIC = "Acidic",
}
