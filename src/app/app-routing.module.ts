import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitTaxFilingComponent } from './page/submit-tax-filing/submit-tax-filing.component';

const routes: Routes = [
  {
    path: '',
    component: SubmitTaxFilingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
