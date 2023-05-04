import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTaxFilingComponent } from './submit-tax-filing.component';

describe('SubmitTaxFilingComponent', () => {
  let component: SubmitTaxFilingComponent;
  let fixture: ComponentFixture<SubmitTaxFilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitTaxFilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTaxFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
