import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioModel, SelectModel } from '../model/submit-tax-filing.model';
import { SubmitTaxFilingService } from '../service/submit-tax-filing.service';

@Component({
  selector: 'app-submit-tax-filing',
  templateUrl: './submit-tax-filing.component.html',
  styleUrls: ['./submit-tax-filing.component.css']
})
export class SubmitTaxFilingComponent implements OnInit {
  formGroup1!: FormGroup;
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  filingTypes: RadioModel[] = [];
  months: SelectModel[] = [];
  years: SelectModel[] = [];
  today: Date = new Date();
  currentMonth: number = 0;

  constructor(
    private fb: FormBuilder,
    private submitTaxFilingService: SubmitTaxFilingService
  ) {
    this.filingTypes = this.submitTaxFilingService.queryFilingType();
    this.months = this.submitTaxFilingService.queryMonth();
    this.years = this.submitTaxFilingService.queryYear();
    this.currentMonth = this.today.getMonth() + 1;
    this.formGroup1 = this.fb.group({
      filingType: ['0', Validators.required],
      month: [1, Validators.required],
      year: [2020, Validators.required],
      saleAmount: [null],
      taxAmount: [null]
    });
  }

  ngOnInit(): void {
  }

  onChangeSaleAmount(): void {
    const saleAmount = this.formGroup1.controls['saleAmount'].value || 0;
    this.formGroup1.controls['taxAmount'].setValue(+((0.07 * saleAmount).toFixed(2)));
  }

  onChangeTaxAmount(): void {
    const saleAmount = this.formGroup1.controls['saleAmount'].value || 0;
    const defaultTaxAmount = +((0.07 * saleAmount).toFixed(2));
    const taxAmount = this.formGroup1.controls['taxAmount'].value || 0;
    if (this.diff(defaultTaxAmount, taxAmount) > 20){
      alert('Invalid Tax')
      this.formGroup1.controls['taxAmount'].setValue(defaultTaxAmount);
    }
  }

  diff(num1: number, num2: number) {
    if (num1 > num2) {
      return num1 - num2
    } else {
      return num2 - num1
    }
  }

}
