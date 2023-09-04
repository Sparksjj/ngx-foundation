import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

// TODO: make it stanalon
@Directive({
  selector: '[deferLoad]',
})
export class DeferLoadDirective implements AfterViewInit, OnDestroy {
  @Input() self!: boolean;
  /** root `Element`, parent container of elements */
  @Input() rootSelector?: string;
  /** selector to find child list */
  @Input() selector = '.defer-load-item';
  @Output() deferLoad: EventEmitter<void> = new EventEmitter();
  @Output() deferLoadAlt: EventEmitter<void> = new EventEmitter();

  private intersectionObserver?: IntersectionObserver;
  private mutationObserver!: MutationObserver;
  private lastElement!: Element;
  private firstElement!: Element;

  /**
   * Construct a new directive for infinite scroll pagination.
   */
  constructor(private elRef: ElementRef) {}

  /**
   * A lifecycle hook in which `IntersectionObserver` is created.
   */
  ngAfterViewInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      entries => {
        this.checkForIntersection(entries);
      },
      {
        root: this.rootSelector
          ? document.querySelector(this.rootSelector)
          : null,
      }
    );
    if (this.self) {
      this.resubElement(this.elRef.nativeElement, this.elRef.nativeElement);
    } else {
      this.mutationObserver = new MutationObserver(() => {
        const list = document.querySelectorAll(this.selector);
        this.resubElement(list[list.length - 1], list[0]);
      });
      this.mutationObserver.observe(this.elRef.nativeElement, {
        childList: true,
        subtree: true,
        attributes: false,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  /**
   * Construct a private function that checking the element and resubscribe to the `IntersectionObserver`.
   *
   * @param element `ElementRef`
   */
  private resubElement(last: Element, first: Element): void {
    if (!last || !first) {
      return;
    }

    if (this.lastElement) {
      this.intersectionObserver?.unobserve(this.lastElement);
    }

    if (this.firstElement) {
      this.intersectionObserver?.unobserve(this.firstElement);
    }

    this.lastElement = last;
    this.firstElement = first;
    this.intersectionObserver?.observe(this.lastElement);
    this.intersectionObserver?.observe(this.firstElement);
  }

  /**
   * Construct a private function that checking entries and emitting output event for load new elements.
   *
   * @param entries `Array<IntersectionObserverEntry>`.
   */
  private checkForIntersection(
    entries: Array<IntersectionObserverEntry>
  ): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry, false)) {
        this.deferLoad.emit();
        if (this.self) {
          this.destroy();
        }
      }
      if (this.checkIfIntersecting(entry, true)) {
        this.deferLoadAlt.emit();
        if (this.self) {
          this.destroy();
        }
      }
    });
  }

  /**
   * Construct a private function that checking if the entry is the last element.
   *
   * @param entry `IntersectionObserverEntry`.
   *
   * @return `Boolean`.
   */
  private checkIfIntersecting(
    entry: IntersectionObserverEntry,
    first: boolean
  ): boolean {
    return (
      entry.isIntersecting &&
      entry.target === (first ? this.firstElement : this.lastElement)
    );
  }

  /**
   * Construct a private function that stop observer from observing any mutation.
   */
  private destroy(): void {
    if (this.intersectionObserver) {
      if (this.lastElement) {
        this.intersectionObserver.unobserve(this.lastElement);
      }
      if (this.firstElement) {
        this.intersectionObserver.unobserve(this.firstElement);
      }
      this.intersectionObserver.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}
