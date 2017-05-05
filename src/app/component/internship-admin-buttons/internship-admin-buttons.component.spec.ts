import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipAdminButtonsComponent } from './internship-admin-buttons.component';

describe('InternshipAdminButtonsComponent', () => {
  let component: InternshipAdminButtonsComponent;
  let fixture: ComponentFixture<InternshipAdminButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipAdminButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipAdminButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
