import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { DefaultBackendStaticModel } from '../models/default-backend-static-model';
import {
  BACKEND_STATIC_API_ENDPOINT,
  BACKEND_STATIC_CLASS_FOR_INSTANCE,
  BACKEND_STATIC_DEFAULT_VALUE,
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
    @Inject(BACKEND_STATIC_CLASS_FOR_INSTANCE) private model: new () => T,
    @Inject(BACKEND_STATIC_DEFAULT_VALUE) private defaultValue: T
  ) {}

  loadStatic(): Observable<T> {
    return this.http.get<T>(this.endpoint).pipe(
      catchError(err => {
        if (this.defaultValue) {
          console.warn(
            `Error during loading static, try to change 'BACKEND_STATIC_API_ENDPOINT' ` +
              `injection token to set right API endpoint or set some debug value to ` +
              `'BACKEND_STATIC_DEFAULT_VALUE' injection token if you nead to continue resover. ` +
              `Status: ${err?.status}; text: ${err?.statusText}`
          );
          return of(this.defaultValue);
        } else {
          return throwError(
            () =>
              new Error(
                `Error during loading static, try to change 'BACKEND_STATIC_API_ENDPOINT' ` +
                  `injection token to set right API endpoint or set some debug value to` +
                  `'BACKEND_STATIC_DEFAULT_VALUE' injection token if you nead to continue resover. ` +
                  `Status: ${err?.status}; text: ${err?.statusText}`
              )
          );
        }
      }),
      tap(res => {
        this.static = res;
      })
    );
  }

  protected createInstance(model: new (data: T) => T, data: T): T {
    return model ? new model(data) : data;
  }
}
