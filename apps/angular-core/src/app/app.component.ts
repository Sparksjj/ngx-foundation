import { Component } from '@angular/core';
import { BackendStaticService } from 'backend-static';

@Component({
  selector: 'core-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-core';

  constructor(private staticService: BackendStaticService) {
    console.log(staticService);
  }
}
