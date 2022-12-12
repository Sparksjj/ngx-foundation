import { Type } from '@angular/core';

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMetaLink {
  active: boolean;
  label: string;
  url: string;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: PaginationMetaLink[];
}

export interface Pagination<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export class Pagination<T> implements Pagination<T> {
  data: T[];
  links!: PaginationLinks;
  meta!: PaginationMeta;

  get hasNextPage(): boolean {
    return !!this.links.next;
  }

  constructor(data: Pagination<T>, ctor: Type<T>) {
    Object.assign(this, data);
    this.data = data.data.map(item => new ctor(item));
  }
}
