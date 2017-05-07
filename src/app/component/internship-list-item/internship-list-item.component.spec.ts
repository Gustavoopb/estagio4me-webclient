import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipListItemComponent } from './internship-list-item.component';

describe('InternshipListItemComponent', () => {
  let component: InternshipListItemComponent;
  let fixture: ComponentFixture<InternshipListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
