import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  BackendStaticResolver,
  BACKEND_STATIC_CLASS_FOR_INSTANCE,
  BACKEND_STATIC_DEFAULT_VALUE,
} from 'backend-static';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

class Test {
  a = 'test';

  constructor(data: any) {
    Object.assign(this, data);
  }
}
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: NxWelcomeComponent,
        resolve: [BackendStaticResolver],
      },
    ]),
  ],
  providers: [
    {
      provide: BACKEND_STATIC_CLASS_FOR_INSTANCE,
      useValue: Test,
    },
    {
      provide: BACKEND_STATIC_DEFAULT_VALUE,
      useValue: { a: 'Test 2' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
