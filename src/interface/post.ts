export interface IPostType {
  id?: number;
  images: Array<string>;
  title: string;
  subtitle: string;
  date: string;
  price: number;
  rating: number | string;
}
