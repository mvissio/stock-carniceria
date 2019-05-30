import { TestBed } from '@angular/core/testing';

import { MeasurementUnitService } from './measurement-unit.service';

describe('MeasurementUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasurementUnitService = TestBed.get(MeasurementUnitService);
    expect(service).toBeTruthy();
  });
});
