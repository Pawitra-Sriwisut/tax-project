import { Directive, HostListener, ElementRef, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { clearObjectRef } from "../helper/handler";
import { CustomNumeralPipe } from "../pipe/custom-numeral-pipe";

export interface ResultEvent {
    value: string | any;
    text: string;
    fromInit?: boolean;
}
@Directive({ selector: "[number]" })
export class CustomNumeralFormatterDirective implements AfterViewInit, OnChanges, OnInit {
    @Input('value') public mValue: any;
    @Input('integer') prefix: number = 12;
    @Input('fraction') suffix: number = 4;
    @Input('allow-negative') isNegativeAllow: boolean = false;
    @Input('allow-empty') isEmptyAllow: boolean = false;
    @Input('allow-transform') isTransformAllow: boolean = true;
    @Input('allow-search') isSearchAllow: boolean = false;
    // @Output() update: EventEmitter<ResultEvent> = new EventEmitter();
    @Output() onUpdate: EventEmitter<ResultEvent> = new EventEmitter();

    constructor(
        public elementRef: ElementRef,
        public currencyPipe: CustomNumeralPipe,
        public cdr: ChangeDetectorRef
    ) {
        this.el = this.elementRef.nativeElement;
        this.el.style.setProperty('text-align', 'right');
    }
    public el: HTMLInputElement;
    ngOnInit() {
        setTimeout(() => {
            this.setupInitial();
        }, 100);
    }
    ngAfterViewInit(): void {
        //this.setupInitial();
    }
    public setupInitial() {
        if (!this.isTransformAllow)
            this.el.style.setProperty('text-align', 'left');

        if (this.el.value == '' || this.el.value == null) {
            if (this.mValue !== null) {
                this.el.value = this.isTransformAllow ? this.currencyPipe.transform(this.mValue, this.suffix, this.isSearchAllow) : clearObjectRef(this.mValue);
            }
        }
        if (this.suffix >= 0) {
            this.onBlur(true);
        }
        this.cdr.detectChanges();
    }
    ngOnChanges(changes: SimpleChanges): void {
        let changer = changes.mValue;
        if (changer && !changer.isFirstChange()) {
            let value = this.checkValidPaste(changer.currentValue + "");
            this.el.value = this.isTransformAllow ? this.currencyPipe.transform(value, this.suffix, this.isSearchAllow) : value;
            this.getEmpty();
        }
    }
    private getEmpty() {
        if (this.isEmptyAllow && parseFloat(this.el.value) === 0) {
            this.el.value = '';
        }
    }

    @HostListener("blur")
    onBlur(fromInit?: boolean) {
        if (this.isTransformAllow)
            this.el.value = this.currencyPipe.transform(this.el.value, this.suffix, this.isSearchAllow);
        this.getEmpty();
        let _value = this.currencyPipe.parse(this.el.value, this.suffix, this.isSearchAllow);
        // this.update.emit({ value: _value, text: this.el.value, fromInit });
        this.onUpdate.emit({ value: _value, text: this.el.value, fromInit });
    }
    @HostListener("focus")
    onFocus() {
        if (this.isTransformAllow) {
            let str = this.currencyPipe.parse(this.el.value, this.suffix, this.isSearchAllow); // opossite of transform
            if (str === '0' && !this.isSearchAllow) {
                this.el.value = '';
            } else {
                this.el.value = str;
            }
        }
    }

    @HostListener('keyup', ['$event'])
    onKeyUp(e: KeyboardEvent) {
        if (
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) || // Allow: Ctrl+V
            (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) // Allow: Ctrl+X
        ) {
            //after command
            this.el.value = this.checkValidPaste(this.el.value);
        }
    }
    private dotKey(e: KeyboardEvent) {
        return e.keyCode == 190 || e.keyCode == 110
    }
    @HostListener('keydown', ["$event"])
    onKeyDown(e: KeyboardEvent) {
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter
            [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
            (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
            (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
            (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
            (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
            (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
            (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
            (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
            (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
        ) {
            return;  // let it happen, don't do anything
        }
        let dotkey = false, neg_sign_key = false;
        if (e.keyCode == 189 || e.keyCode == 109) {//key -
            if (!this.isNegativeAllow) {
                e.preventDefault();
                return;
            }
            neg_sign_key = true;
        }
        if (this.dotKey(e)) {//key .
            if (this.suffix == 0) {
                e.preventDefault()
                return;
            }
            dotkey = true;
        }

        // Ensure that it is a number and stop the keypress

        // code เก่า
        // if (
        //     (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
        //     (e.keyCode < 96 || e.keyCode > 105) &&
        //     !(dotkey || neg_sign_key)

        // ) {
        //     e.preventDefault();
        // } 

        // code ใหม่ ดัก key ที่สามารถใส่ได้แทน
        if (
            !(e.key == '1' || e.key == '2' || e.key == '3' || e.key == '4' ||
                e.key == '5' || e.key == '6' || e.key == '7' || e.key == '8' ||
                e.key == '9' || e.key == '0') &&
            !(dotkey || neg_sign_key)

        ) {
            e.preventDefault();
        }
        else {
            //input valid
            let current: string = this.el.value;
            let position: number | null = this.el.selectionStart;
            let newInput: string = [current.slice(0, position!), e.key, current.slice(position!)].join('');;
            let newInputLength = newInput.length;
            if (newInputLength > 1 && newInput.startsWith('0') && !newInput.startsWith('0.')) {
                e.preventDefault();
                return;
            }
            var typeRegEx: RegExp = this.getRegExCheck();
            if (newInput && !String(newInput).match(typeRegEx)) {
                if (dotkey) {
                    this.dotKeyCheck(newInput, newInputLength, e);
                    return;
                } else if (neg_sign_key && this.isNegativeAllow) {
                    this.signKeyCheck(newInput, newInputLength, e);
                    return;
                }
                if (this.el.selectionStart != this.el.selectionEnd) {
                    return;
                }
                e.preventDefault();
            } else {
                let dotCount = newInput.split(".").length - 1;
                if (this.el.selectionStart != this.el.selectionEnd) {
                    return;
                }
                if (dotCount == 0 && newInput.length > this.prefix) {
                    event?.preventDefault();
                    return;
                }
            }
        }
    }

    private signKeyCheck(newInput: string, newInputLength: number, e: KeyboardEvent) {
        let signCount = newInput.split("-").length - 1;
        if (newInputLength > 0 && signCount > 1) { //condition to accept min of 1 dot
            e.preventDefault();
        } else if (newInputLength > 0 && !newInput.startsWith('-')) {
            e.preventDefault();
        }
    }
    private dotKeyCheck(newInput: string, newInputLength: number, e: KeyboardEvent) {
        let dotCount = newInput.split(".").length - 1; // count of dots present
        if (newInputLength > 0 && dotCount > 1) { //condition to accept min of 1 dot
            e.preventDefault();
        }
    }
    private getRegExCheck(): RegExp {
        if (this.isNegativeAllow)
            return this.suffix > 0 ? new RegExp("(^[-]{0,1}[0-9]{1," + this.prefix + "})+(\.[0-9]{1," + this.suffix + "})?$", "g") : new RegExp(/^\d+$/)
        return this.suffix > 0 ? new RegExp("(^[0-9]{1," + this.prefix + "})+(\.[0-9]{1," + this.suffix + "})?$", "g")
            : new RegExp(/^\d+$/);
    }
    public checkValidPaste(inputValue: string): string {
        if (inputValue == '') return '';
        if (this.suffix == 0 && inputValue.indexOf('.') >= 0) return '';
        if (!this.isNegativeAllow && inputValue.indexOf('-') >= 0) return '';
        var dotPattern = /^[.]*$/;
        if (dotPattern.test(inputValue)) {
            return '';
        }
        let pattern = this.getRegExCheck();
        if (pattern.test(inputValue)) {//pattern pass
            let dotCount = inputValue.split(".").length - 1; // count of dots present
            if (inputValue.length > this.prefix && dotCount == 0) {
                inputValue = inputValue.slice(0, inputValue.length - 1);
            }
            return inputValue;
        } else {
            let value = parseFloat(inputValue);
            if (!isNaN(value) && value.toString().indexOf('.') != -1) {
                let _float = value.toFixed(this.suffix);
                return this.currencyPipe.parse(_float, this.suffix, this.isSearchAllow);
            }
        }
        return '';
    }

}