import { Directive, ElementRef, OnChanges, Input } from '@angular/core';

@Directive({
  selector: '[highligth]'
})
export class HighligthDirective {

  defaultColor = 'gray';
  @Input('highligth') bgColor = 'blue';

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }

}
