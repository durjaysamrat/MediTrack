import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTbComponent } from './admin-tb.component';

describe('AdminTbComponent', () => {
  let component: AdminTbComponent;
  let fixture: ComponentFixture<AdminTbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
