import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it("should post the employee details in an array", () => {
    const service: ApiService = TestBed.get(ApiService);
    const data = [
      {
        "id": 1,
        "firstName": "john",
        "lastName": "war",
        "email": "john@gmail.com",
        "mobile": "14234345436"
      },
      {
        "id": 2,
        "firstName": "harry",
        "lastName": "potter",
        "email": "www.harry@gmail.com",
        "mobile": "25345"
      },
      {
        "id": 3,
        "firstName": "yard",
        "lastName": "hook",
        "email": "yard@gmail.com",
        "mobile": "69879809"
      }
    ]
    service.postEmployee(data);
    expect(service.postEmployee(data)).toBeGreaterThanOrEqual(1);
  });

  it("should get all the employee details in an array", () => {
    const service: ApiService = TestBed.get(ApiService);
    service.getEmployee();
    expect(service.getEmployee()).toBeGreaterThanOrEqual(1);
  });

  
});
