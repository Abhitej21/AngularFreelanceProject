import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainloaderComponent } from './mainloader.component';

describe('MainloaderComponent', () => {
  let component: MainloaderComponent;
  let fixture: ComponentFixture<MainloaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainloaderComponent]
    });
    fixture = TestBed.createComponent(MainloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
