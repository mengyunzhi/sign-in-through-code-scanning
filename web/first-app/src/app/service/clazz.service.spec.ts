import { TestBed } from '@angular/core/testing';

import { ClazzService } from './clazz.service';
import {HttpClientModule} from '@angular/common/http';

describe('ClazzService', () => {
  let service: ClazzService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ClazzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
