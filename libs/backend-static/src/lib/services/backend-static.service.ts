import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DefaultBackendStaticModel } from '../models/default-backend-static-model';
import { BACKEND_STATIC_API_ENDPOINT } from '../tokens/backend-static-api-token';

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
    this._static = value;
    this.static$.next(value);
  }

  constructor(
    private http: HttpClient,
    @Inject(BACKEND_STATIC_API_ENDPOINT) private endpoint: string
  ) {}

  loadStatic(): Observable<T> {
    return this.http.get<T>(this.endpoint).pipe(
      tap((res) => {
        this.static = res;
      })
    );
  }
}
