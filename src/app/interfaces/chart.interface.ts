export interface Chart {
  id: string;
  name: string;
  categories: Categories[]; // user can have one or more addresses
}

export interface Categories {
  name: string;
  value: number;
}
