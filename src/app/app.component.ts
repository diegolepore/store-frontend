import { Component } from '@angular/core'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

interface AppState {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'store-frontend';

  message$: Observable<string>

  constructor(private store: Store<AppState>) {
    this.message$ = this.store.select('message')
  }

  spanishMessage(): void {
    this.store.dispatch({ type: 'SPANISH' })
  }

  frenchMessage(): void {
    this.store.dispatch({ type: 'FRENCH' })
  }
}
