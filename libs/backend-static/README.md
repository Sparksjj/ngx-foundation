# @ngx-foundation/backend-static

You mast import HttpClientModule in your application before using this lib

## Getting started

### Step 1: Install `@ngx-foundation/backend-static`:

#### NPM

```shell
npm install --save @ngx-foundation/backend-static
```

### Step 2: Add the BackendStaticResolver for the required route and HttpClientModule:

WARNING: Don't forget to add HttpClientModule.

```js
import { HttpClientModule } from '@angular/common/http';
import { BackendStaticResolver } from '@ngx-foundation/backend-static';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent,
        resolve: [BackendStaticResolver],
      },
    ]),
  ],
})
export class AppModule {}
```

### Step 3: Configure OPTIONAL InjectionTokens for api url (BACKEND_STATIC_API_ENDPOINT) and default data (BACKEND_STATIC_DEFAULT_VALUE) InjectionToken:

```js
import { HttpClientModule } from '@angular/common/http';
import { BackendStaticResolver, BACKEND_STATIC_DEFAULT_VALUE, BACKEND_STATIC_DEFAULT_VALUE } from '@ngx-foundation/backend-static';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent,
        resolve: [BackendStaticResolver],
      },
    ]),
    providers: [
      {
        provide: BACKEND_STATIC_DEFAULT_VALUE,
        useValue: 'api url [default "/static"]',
      },
      {
        provide: BACKEND_STATIC_DEFAULT_VALUE,
        useValue: {someData: [1, 2, 3]}, // Set this value if responce comes with an error (for debuging if api dosn't exist)
      },
    ],
  ]
})
export class AppModule {}
```

### Step 4: Use static value where you want using BackendStaticService:

```js
import { BackendStaticService } from '@ngx-foundation/backend-static';

@Component({
  selector: 'core-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  get static() {
    return this.staticService.static;
  }
  constructor(private staticService: BackendStaticService) {}
}
```

## API

### BackendStaticService

| Name         | Type               | Description                      |
| ------------ | ------------------ | -------------------------------- |
| static$      | BehaveorSubject<T> | BehaveorSubject with static data |
| static       | <T>                | Static data                      |
| loadStatic() | Observable<T>      | Method to load static data       |
