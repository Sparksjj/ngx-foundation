import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplateliteralsPipe } from './templateliterals.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TemplateliteralsPipe],
  exports: [TemplateliteralsPipe],
})
export class NgxPipesModule {}
