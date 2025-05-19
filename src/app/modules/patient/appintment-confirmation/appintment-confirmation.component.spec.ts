import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppintmentConfirmationComponent } from './appintment-confirmation.component';

describe('AppintmentConfirmationComponent', () => {
  let component: AppintmentConfirmationComponent;
  let fixture: ComponentFixture<AppintmentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppintmentConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppintmentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
