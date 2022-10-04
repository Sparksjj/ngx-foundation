import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const el = this.elRef.nativeElement;
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      this.focus(el);
    } else {
      const nestedEl: HTMLInputElement | HTMLTextAreaElement | null =
        el.querySelector('input, textarea');
      if (nestedEl) {
        this.focus(nestedEl);
      }
    }
  }

  focus(el: HTMLInputElement | HTMLTextAreaElement): void {
    // Without timeout not working in some cases
    setTimeout(() => {
      el.focus();
    }, 40);
  }
}
