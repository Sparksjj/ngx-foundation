# @ngx-basis/backend-static

You mast import HttpClientModule in your application before using this lib

## Getting started

### Step 1: Install `@ngx-basis/backend-static`:

#### NPM

```shell
npm install --save @ngx-basis/backend-static
```

### Step 2: Add the BackendStaticResolver for the required route and HttpClientModule:

WARNING: Don't forget to add HttpClientModule.

```js
import { HttpClientModule } from '@angular/common/http';
import { BackendStaticResolver } from '@ngx-basis/backend-static';

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
import { BackendStaticResolver, BACKEND_STATIC_DEFAULT_VALUE, BACKEND_STATIC_DEFAULT_VALUE } from '@ngx-basis/backend-static';

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

### Step 4: You can add class to OPTIONAL BACKEND_STATIC_CLASS_FOR_INSTANCE InjectionTokens to create an instance with raw data:

```js
import { HttpClientModule } from '@angular/common/http';
import { BACKEND_STATIC_CLASS_FOR_INSTANCE } from '@ngx-basis/backend-static';

class Static() {
  constructor(data: Static) => {
    Object.assign(this, data)
  }
}

@NgModule({
  declarations: [AppComponent],
  ...
  providers: [
    {
      provide: BACKEND_STATIC_CLASS_FOR_INSTANCE,
      useValue: Static, // raw data from api responce will be curl to this class like Static(data) and will save instance to service
    },
  ],
})
export class AppModule {}
```

### Step 5: Use static value where you want using BackendStaticService:

```js
import { BackendStaticService } from '@ngx-basis/backend-static';

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

| Name         | Type                 | Description                      |
| ------------ | -------------------- | -------------------------------- |
| static$      | BehaveorSubject\<T\> | BehaveorSubject with static data |
| static       | \<T\>                | Static data                      |
| loadStatic() | Observable\<T\>      | Method to load static data       |
