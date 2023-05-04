import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FullLayoutComponent } from './layout/full-layout/full-layout.component';
import { SubmitTaxFilingComponent } from './page/submit-tax-filing/submit-tax-filing.component';
import { InputDetailComponent } from './page/component/input-detail/input-detail.component';
import { ReviewAndConfirmComponent } from './page/component/review-and-confirm/review-and-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SubmitTaxFilingComponent,
    InputDetailComponent,
    ReviewAndConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
