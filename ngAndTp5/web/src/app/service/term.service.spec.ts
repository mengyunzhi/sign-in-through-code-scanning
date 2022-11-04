import { TestBed } from '@angular/core/testing';

import { TermService } from './term.service';
import {HttpClientModule} from '@angular/common/http';

describe('TermService', () => {
  let service: TermService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(TermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
