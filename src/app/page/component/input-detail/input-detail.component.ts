import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioModel, SelectModel, TaxModel } from '../../model/submit-tax-filing.model';
import { SubmitTaxFilingService } from '../../service/submit-tax-filing.service';

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

  constructor(
    private submitTaxFilingService: SubmitTaxFilingService,
  ) {
    this.filingTypes = this.submitTaxFilingService.queryFilingType();
    this.months = this.submitTaxFilingService.queryMonth();
    this.years = this.submitTaxFilingService.queryYear();
    this.currentMonth = this.today.getMonth() + 1;
  }

  ngOnInit(): void {
  }

  onChangeSaleAmount(): void {
    const saleAmount = this.formGroup1.controls['saleAmount'].value || 0;
    const taxAmount = +((0.07 * saleAmount).toFixed(2));
    this.formGroup1.controls['taxAmount'].setValue(taxAmount);
    this.formGroup1.controls['surcharge'].setValue(+((0.1 * taxAmount).toFixed(2)));
    this.sumTotalOfVat();
  }

  onChangeTaxAmount(): void {
    const saleAmount = this.formGroup1.controls['saleAmount'].value || 0;
    const defaultTaxAmount = +((0.07 * saleAmount).toFixed(2));
    const taxAmount = this.formGroup1.controls['taxAmount'].value || 0;
    if (this.diff(defaultTaxAmount, taxAmount) > 20) {
      alert('Invalid Tax')
      this.formGroup1.controls['taxAmount'].setValue(defaultTaxAmount);
      this.formGroup1.controls['surcharge'].setValue(+((0.1 * defaultTaxAmount).toFixed(2)));
    }
    else {
      this.formGroup1.controls['surcharge'].setValue(+((0.1 * taxAmount).toFixed(2)));
    }
    this.sumTotalOfVat();
  }

  sumTotalOfVat(): void {
    const taxAmount = this.formGroup1.controls['taxAmount'].value || 0;
    const surcharge = this.formGroup1.controls['surcharge'].value || 0;
    const penalty = this.formGroup1.controls['penalty'].value || 0;
    this.formGroup1.controls['totalAmount'].setValue(taxAmount + surcharge + penalty);
  }

  diff(num1: number, num2: number) {
    if (num1 > num2) {
      return num1 - num2
    } else {
      return num2 - num1
    }
  }

  onNext(): void {
    const value = this.formGroup1.getRawValue();
    const filingTypeDec = this.filingTypes.find(x => x.value === value.filingType)?.label;
    const monthDec = this.months.find(x => x.value === value.month)?.label;
    const yearDec = this.years.find(x => x.value === value.year)?.label;
    if (this.formGroup1.invalid)
      alert('Invalid Data')
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
