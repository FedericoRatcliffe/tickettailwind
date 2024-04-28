import { TestBed } from '@angular/core/testing';

import { SendFormsService } from './send-forms.service';

describe('SendFormsService', () => {
  let service: SendFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
