import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appKeyValue]'
})
export class KeyValueDirective {
  @Input() set appKeyValue(obj: Record<string, any>) {
    this.viewContainer.clear();
    if (obj) {
      Object.entries(obj).forEach(([key, value]) => {
        this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: { key, value } });
      });
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}
}
