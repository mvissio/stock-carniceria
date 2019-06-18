import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxsComponent } from './boxs.component';

describe('BoxsComponent', () => {
  let component: BoxsComponent;
  let fixture: ComponentFixture<BoxsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
