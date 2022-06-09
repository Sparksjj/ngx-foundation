import { InjectionToken } from '@angular/core';

export const BACKEND_STATIC_API_ENDPOINT = new InjectionToken<string>(
  'Api endpoint url',
  {
    factory: () => '/static',
  }
);

export const BACKEND_STATIC_DEFAULT_VALUE = new InjectionToken(
  'Default value for static',
  {
    factory: () => undefined,
  }
);
