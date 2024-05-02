import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatesteachComponent } from './latesteach.component';

describe('LatesteachComponent', () => {
  let component: LatesteachComponent;
  let fixture: ComponentFixture<LatesteachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatesteachComponent]
    });
    fixture = TestBed.createComponent(LatesteachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
