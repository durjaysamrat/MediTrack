import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskusersComponent } from './deskusers.component';

describe('DeskusersComponent', () => {
  let component: DeskusersComponent;
  let fixture: ComponentFixture<DeskusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
