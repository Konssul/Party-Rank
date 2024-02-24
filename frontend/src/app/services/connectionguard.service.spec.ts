import { TestBed } from '@angular/core/testing';

import { ConnectionguardService } from './connectionguard.service';

describe('ConnectionguardService', () => {
  let service: ConnectionguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
