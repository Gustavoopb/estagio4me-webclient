import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutedComponentComponent } from './routed-component.component';

describe('RoutedComponentComponent', () => {
  let component: RoutedComponentComponent;
  let fixture: ComponentFixture<RoutedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
