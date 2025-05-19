import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRecordManegeComponent } from './health-record-manege.component';

describe('HealthRecordManegeComponent', () => {
  let component: HealthRecordManegeComponent;
  let fixture: ComponentFixture<HealthRecordManegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthRecordManegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthRecordManegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
