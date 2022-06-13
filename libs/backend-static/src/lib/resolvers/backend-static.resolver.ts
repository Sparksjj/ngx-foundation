import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { DefaultBackendStaticModel } from '../models/default-backend-static-model';
import { BackendStaticService } from '../services/backend-static.service';
import { BACKEND_STATIC_DEFAULT_VALUE } from '../tokens/backend-static-api-token';

@Injectable({ providedIn: 'root' })
export class BackendStaticResolver<T = DefaultBackendStaticModel>
  implements Resolve<T>
{
  get static(): T {
    return this.backendStaticService.static;
  }

  constructor(
    private backendStaticService: BackendStaticService<T>,
    @Inject(BACKEND_STATIC_DEFAULT_VALUE) private defaultValue: T
  ) {}

  resolve(): Observable<T> | Promise<T> | T {
    return this.backendStaticService.loadStatic().pipe(
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
      })
    );
  }
}
