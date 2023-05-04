import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import * as pipe from './pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { DirectivesModule } from "./directives/directives.module";
import { CustomNumeralFormatterDirective } from "./directives/custom-numeral-formatter.directive";

const angularMatModule = [
  MatSlideToggleModule,
  MatFormFieldModule,
  MatStepperModule,
  MatInputModule
];

@NgModule({
  declarations: [
    CustomNumeralFormatterDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...angularMatModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [pipe.CustomNumeralPipe],
  exports: [
    ...angularMatModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    CustomNumeralFormatterDirective
  ],
})
export class SharedModule { }
