export interface Category {
  id: number;
  name: string;
  type: string;
  children: Category[];
}
