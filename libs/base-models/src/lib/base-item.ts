export class BaseItem<T> implements BaseItem<T> {
  id!: number;
  updated_at!: string;
  created_at!: string;

  constructor(data: Partial<T>) {
    this.update(data);
  }

  update(data: Partial<T>): void {
    Object.assign(this, data);
  }
}

export interface BaseItem<T> {
  id: number;
  updated_at: string;
  created_at: string;
  update(data: Partial<T>): void;
}
