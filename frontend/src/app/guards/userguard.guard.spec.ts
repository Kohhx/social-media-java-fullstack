import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userguardGuard } from './userguard.guard';

describe('userguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
