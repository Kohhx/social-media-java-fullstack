import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHeadingComponent } from './login-heading.component';

describe('LoginHeadingComponent', () => {
  let component: LoginHeadingComponent;
  let fixture: ComponentFixture<LoginHeadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginHeadingComponent]
    });
    fixture = TestBed.createComponent(LoginHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
