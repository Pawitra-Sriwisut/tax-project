import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';

const angularMatModule = [
  MatSlideToggleModule,
  MatFormFieldModule,
  MatStepperModule,
  MatInputModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...angularMatModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...angularMatModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
