import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Books } from '../Books';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResultsSubject = new BehaviorSubject<Books[]>([]);
  public searchResults$ = this.searchResultsSubject.asObservable();

  updateSearchResults(results: Books[]) {
    this.searchResultsSubject.next(results);
  }
}
