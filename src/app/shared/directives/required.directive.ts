import { Directive, ElementRef, Input, Renderer2, OnInit, OnChanges, SimpleChanges } from "@angular/core";

@Directive({ selector: "[required-field]" })
export class RequiredDirective implements OnInit, OnChanges {
    @Input('required-field') isRequired: boolean;
    private requiredHtml: string = '';
    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.isRequired = false;
    }
    ngOnChanges(changes: SimpleChanges): void {
        let change = changes.isRequired;
        if (change && !change.firstChange) {
            this.generateRequiredHtml();
        }
    }

    ngOnInit(): void {
        this.innerHTML = this.el.nativeElement.innerHTML;
        this.generateRequiredHtml();
    }
    private innerHTML: string = ``;
    private generateRequiredHtml() {
        if (this.isRequired === true) {
            this.requiredHtml =  this.el.nativeElement.innerHTML + ` <span class="required">* </span>`;
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.requiredHtml);
        } else {
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.innerHTML);
        }
    }
}