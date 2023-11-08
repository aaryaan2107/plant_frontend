import { TestBed } from '@angular/core/testing';

import { PlantserviceService } from './plantservice.service';

describe('PlantserviceService', () => {
  let service: PlantserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
