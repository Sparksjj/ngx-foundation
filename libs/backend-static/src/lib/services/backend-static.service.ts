import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DefaultBackendStaticModel } from '../models/default-backend-static-model';
import {
  BACKEND_STATIC_API_ENDPOINT,
  BACKEND_STATIC_CLASS_FOR_INSTANCE,
} from '../tokens/backend-static-tokens';

@Injectable({
  providedIn: 'root',
})
export class BackendStaticService<T = DefaultBackendStaticModel> {
  static$ = new BehaviorSubject(this.static);

  private _static!: T;

  get static(): T {
    return this._static;
  }

  set static(value: T) {
    this._static = this.createInstance(this.model, value);
    this.static$.next(this._static);
  }

  constructor(
    protected http: HttpClient,
    @Inject(BACKEND_STATIC_API_ENDPOINT) private endpoint: string,
    @Inject(BACKEND_STATIC_CLASS_FOR_INSTANCE) private model: new () => T
  ) {}

  loadStatic(): Observable<T> {
    return this.http.get<T>(this.endpoint).pipe(
      tap(res => {
        this.static = res;
      })
    );
  }

  protected createInstance(model: new (data: T) => T, data: T): T {
    return model ? new model(data) : data;
  }
}
