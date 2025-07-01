import type { ITodo } from "./ITodo";

export interface IPaginatedTodosResponse {
      items: ITodo[];
      total: number;
    }