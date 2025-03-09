import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDeskComponent } from './front-desk.component';

describe('FrontDeskComponent', () => {
  let component: FrontDeskComponent;
  let fixture: ComponentFixture<FrontDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontDeskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
