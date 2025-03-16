import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUsersComponent } from './doctorusers.component';

describe('DoctorusersComponent', () => {
  let component: DoctorUsersComponent;
  let fixture: ComponentFixture<DoctorUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
