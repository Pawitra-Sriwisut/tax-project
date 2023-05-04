import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaxModel } from '../../model/submit-tax-filing.model';

@Component({
  selector: 'app-review-and-confirm',
  templateUrl: './review-and-confirm.component.html',
  styleUrls: ['./review-and-confirm.component.css']
})
export class ReviewAndConfirmComponent implements OnInit {
  @Input() taxData: TaxModel = new TaxModel();
  constructor() { }

  ngOnInit(): void {
  }

  onConfirmAndSubmit(): void {
    alert('Yeeeee')
  }

}
