import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templateliterals',
})
export class TemplateliteralsPipe implements PipeTransform {
  // Replace {{key}} from text on the same key from args obj
  transform(value: string, args: { [key: string]: string | number }): string {
    if (!value || typeof value !== 'string') {
      return value;
    }
    return value.replace(/{{(.*?)}}/gi, (match: string, p1: string) => {
      return (args[p1] || p1).toString();
    });
  }
}
