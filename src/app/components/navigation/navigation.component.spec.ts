import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { StoreModule } from '@ngrx/store'
import { NavigationComponent } from './navigation.component'

describe('NavigationComponent', () => {
  let component: NavigationComponent
  let fixture: ComponentFixture<NavigationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      declarations: [ NavigationComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})