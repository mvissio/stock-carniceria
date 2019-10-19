import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[autoFocusForEver]'
})
export class AutoFocusForEverDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;

  public constructor(private el: ElementRef) {

  }

  public ngAfterContentInit() {

    setInterval(() => {
      this.el.nativeElement.focus();
    }, 500);

  }

}
