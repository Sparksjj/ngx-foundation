import { BehaviorSubject } from 'rxjs';

export class BaseStorage<T> {
  $data = new BehaviorSubject<T | null>(null);

  public get data(): T {
    return this._data;
  }

  public set data(v: T) {
    this._data = v;
    this.$data.next(this._data);
  }

  private _data!: T;
}
