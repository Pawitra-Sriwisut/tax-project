import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RadioModel, SelectModel, TaxModel } from '../model/submit-tax-filing.model';
import { SubmitTaxFilingService } from '../service/submit-tax-filing.service';

@Component({
  selector: 'app-submit-tax-filing',
  templateUrl: './submit-tax-filing.component.html',
  styleUrls: ['./submit-tax-filing.component.css']
})
export class SubmitTaxFilingComponent implements OnInit {
  isLinear = false;
  formGroup1!: FormGroup;
  taxData: TaxModel = new TaxModel();

  constructor(
    private fb: FormBuilder,
  ) {
    this.formGroup1 = this.fb.group({
      filingType: ['0', Validators.required],
      month: [1, Validators.required],
      year: [2020, Validators.required],
      saleAmount: [null, Validators.required],
      taxAmount: [null, Validators.required],
      surcharge: [{ value: null, disabled: true }],
      penalty: [{ value: 200.00, disabled: true }],
      totalAmount: [{ value: null, disabled: true }],
    });
  }

  ngOnInit(): void {
  }

}
