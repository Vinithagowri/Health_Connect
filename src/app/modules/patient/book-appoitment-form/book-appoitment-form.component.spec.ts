import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppoitmentFormComponent } from './book-appoitment-form.component';

describe('BookAppoitmentFormComponent', () => {
  let component: BookAppoitmentFormComponent;
  let fixture: ComponentFixture<BookAppoitmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAppoitmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAppoitmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
