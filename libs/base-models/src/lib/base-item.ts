export class BaseItem implements BaseItem {
  id!: number;
  updated_at!: string;
  created_at!: string;

  constructor(data: Partial<BaseItem>) {
    this.update(data);
  }

  update(data: Partial<BaseItem>): void {
    Object.assign(this, data);
  }
}

export interface BaseItem {
  id: number;
  updated_at: string;
  created_at: string;
  update(data: Partial<BaseItem>): void;
}
