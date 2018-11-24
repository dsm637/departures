/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepartureboardService } from './departureboard.service';

describe('Service: Departureboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartureboardService]
    });
  });

  it('should ...', inject([DepartureboardService], (service: DepartureboardService) => {
    expect(service).toBeTruthy();
  }));
});
