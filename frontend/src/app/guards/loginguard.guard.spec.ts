import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginguardGuard } from './loginguard.guard';

describe('loginguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
