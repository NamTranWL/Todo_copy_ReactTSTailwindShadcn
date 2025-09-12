export type Filter = "all" | "active" | "completed";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt?: number;
}

export interface TodosState {
  items: Todo[];
  filter: Filter;
}
