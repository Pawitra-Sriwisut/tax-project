import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndConfirmComponent } from './review-and-confirm.component';

describe('ReviewAndConfirmComponent', () => {
  let component: ReviewAndConfirmComponent;
  let fixture: ComponentFixture<ReviewAndConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAndConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAndConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
