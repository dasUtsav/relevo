import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePcComponent } from './update-pc.component';

describe('UpdatePcComponent', () => {
  let component: UpdatePcComponent;
  let fixture: ComponentFixture<UpdatePcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
