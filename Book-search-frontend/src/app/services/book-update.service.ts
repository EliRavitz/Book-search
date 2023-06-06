import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookUpdateService {
  private bookAddedSource = new Subject<void>();
  bookAdded$ = this.bookAddedSource.asObservable();

  triggerBookAdded() {
    this.bookAddedSource.next();
  }
}
