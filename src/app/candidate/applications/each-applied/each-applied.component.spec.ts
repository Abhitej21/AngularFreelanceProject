import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachAppliedComponent } from './each-applied.component';

describe('EachAppliedComponent', () => {
  let component: EachAppliedComponent;
  let fixture: ComponentFixture<EachAppliedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EachAppliedComponent]
    });
    fixture = TestBed.createComponent(EachAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
