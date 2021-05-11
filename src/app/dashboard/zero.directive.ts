import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appZero]',
})

//directive for dashboard Cards
export class ZeroDirective implements AfterViewInit {
  @Input() elementValue;
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit() {
    let val: string = this.element.nativeElement.innerText;
    val = val.split('')[0];
    if (val === '0') {
      this.renderer.addClass(
        this.element.nativeElement,
        'dashboard__card__content__unit--starter'
      );
    } else {
      this.renderer.removeClass(
        this.element.nativeElement,
        'dashboard__card__content__unit--starter'
      );
    }
  }
}
