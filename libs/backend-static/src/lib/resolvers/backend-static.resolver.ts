import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { DefaultBackendStaticModel } from '../models/default-backend-static-model';
import { BackendStaticService } from '../services/backend-static.service';

@Injectable({ providedIn: 'root' })
export class BackendStaticResolver<T = DefaultBackendStaticModel>
  implements Resolve<T>
{
  get static(): T {
    return this.backendStaticService.static;
  }

  constructor(private backendStaticService: BackendStaticService<T>) {}

  resolve(): Observable<T> | Promise<T> | T {
    return this.backendStaticService.loadStatic();
  }
}
