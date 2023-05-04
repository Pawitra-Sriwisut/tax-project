import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioModel, SelectModel, TaxModel } from '../../model/submit-tax-filing.model';
import { SubmitTaxFilingService } from '../../service/submit-tax-filing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.css']
})
export class InputDetailComponent implements OnInit {
  @Input() formGroup1!: FormGroup;
  @Output() onSendTaxData: EventEmitter<TaxModel> = new EventEmitter<TaxModel>();

  filingTypes: RadioModel[] = [];
  months: SelectModel[] = [];
  years: SelectModel[] = [];
  today: Date = new Date();
  currentMonth: number = 0;
  model: TaxModel = new TaxModel();

  constructor(
    private submitTaxFilingService: SubmitTaxFilingService,
    private modalService: NgbModal
  ) {
    this.filingTypes = this.submitTaxFilingService.queryFilingType();
    this.months = this.submitTaxFilingService.queryMonth();
    this.years = this.submitTaxFilingService.queryYear();
    this.currentMonth = this.today.getMonth() + 1;
    this.model.penalty = 200.00;
  }

  ngOnInit(): void {
  }

  onChangeSaleAmount(): void {
    const saleAmount = this.formGroup1.controls['saleAmount'].value || 0;
    const taxAmount = +((0.07 * saleAmount).toFixed(2));
    this.model.taxAmount = taxAmount;
    this.model.surcharge = +((0.1 * taxAmount).toFixed(2));
    this.sumTotalOfVat();
  }

  onChangeTaxAmount(modal: any, e: any): void {
    const saleAmount = this.formGroup1.controls['saleAmount'].value || 0;
    const defaultTaxAmount = +((0.07 * saleAmount).toFixed(2));
    const taxAmountValue = parseFloat(e.target.value.replaceAll(',', '')) || 0;
    if (this.diff(defaultTaxAmount, taxAmountValue) > 20) {
      this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(()=> {
        e.target.value = defaultTaxAmount.toFixed(2);
        this.model.taxAmount = defaultTaxAmount;
        this.model.surcharge = +((0.1 * defaultTaxAmount).toFixed(2));
      });
    }
    else {
      this.model.surcharge = +((0.1 * taxAmountValue).toFixed(2));
    }
    this.sumTotalOfVat();
  }

  sumTotalOfVat(): void {
    const taxAmount = this.model.taxAmount || 0;
    const surcharge = this.model.surcharge || 0;
    const penalty = this.model.penalty || 0;
    this.model.totalAmount = taxAmount + surcharge + penalty;
  }

  diff(num1: number, num2: number) {
    if (num1 > num2) {
      return num1 - num2
    } else {
      return num2 - num1
    }
  }

  onNext(modal: any): void {
    this.formGroup1.patchValue({
      taxAmount: this.model.taxAmount,
      surcharge: this.model.surcharge,
      penalty: this.model.penalty,
      totalAmount: this.model.totalAmount,
    });
    const value = this.formGroup1.getRawValue();
    const filingTypeDec = this.filingTypes.find(x => x.value === value.filingType)?.label;
    const monthDec = this.months.find(x => x.value === value.month)?.label;
    const yearDec = this.years.find(x => x.value === value.year)?.label;
    if (this.formGroup1.invalid)
      this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' });
    else {
      this.onSendTaxData.emit({
        filingTypeValue: value.filingType,
        filingType: filingTypeDec || '',
        monthValue: value.month,
        month: monthDec || '',
        yearValue: value.year,
        year: yearDec || '',
        saleAmount: value.saleAmount,
        taxAmount: value.taxAmount,
        surcharge: value.filingType === '0' ? 0 : value.surcharge,
        penalty: value.filingType === '0' ? 0 : value.penalty,
        totalAmount: value.filingType === '0' ? value.taxAmount : value.totalAmount,
      });
    }
  }

}
