import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicregistrationComponent } from './clinicregistration.component';

describe('ClinicregistrationComponent', () => {
  let component: ClinicregistrationComponent;
  let fixture: ComponentFixture<ClinicregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
