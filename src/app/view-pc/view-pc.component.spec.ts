import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPcComponent } from './view-pc.component';

describe('ViewPcComponent', () => {
  let component: ViewPcComponent;
  let fixture: ComponentFixture<ViewPcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
