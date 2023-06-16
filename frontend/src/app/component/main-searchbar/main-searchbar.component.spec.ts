import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSearchbarComponent } from './main-searchbar.component';

describe('MainSearchbarComponent', () => {
  let component: MainSearchbarComponent;
  let fixture: ComponentFixture<MainSearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainSearchbarComponent]
    });
    fixture = TestBed.createComponent(MainSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
