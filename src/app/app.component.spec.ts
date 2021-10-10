import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MockComponent } from 'ng-mocks'
import { AppComponent } from './app.component'
import { NavigationComponent } from './components/navigation/navigation.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(NavigationComponent)
      ]
    }).compileComponents()
  })

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  // it('should have as title \'post-reader\'', () => {
  //   const fixture = TestBed.createComponent(AppComponent)
  //   const app = fixture.componentInstance
  //   expect(app.title).toEqual('post-reader')
  // })

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent)
  //   fixture.detectChanges()
  //   const compiled = fixture.nativeElement as HTMLElement
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('post-reader app is running!')
  // })
})
