import { Component, Input, OnInit } from '@angular/core';
import { TaxModel } from '../../model/submit-tax-filing.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-and-confirm',
  templateUrl: './review-and-confirm.component.html',
  styleUrls: ['./review-and-confirm.component.css']
})
export class ReviewAndConfirmComponent implements OnInit {
  @Input() taxData: TaxModel = new TaxModel();
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onConfirmAndSubmit(modal: any): void {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
      window.location.reload();
    });
  }

}
