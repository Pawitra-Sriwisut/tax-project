import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TaxRoutingModule } from './tax-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TaxRoutingModule,
    SharedModule,
  ],
  providers: [
  ]
})
export class TaxModule { }
