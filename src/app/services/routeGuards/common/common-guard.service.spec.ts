import { TestBed } from '@angular/core/testing'

import { CommonGuardService } from './common-guard.service'

describe('CommonGuardService', () => {
  let service: CommonGuardService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CommonGuardService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
