
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

export enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}
