import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap, switchMap } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  filteredBooks: Observable<string[]> | undefined;

  constructor(
    private bookService: BookService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.filteredBooks = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this._filterBooks(value))
    );

    this.filteredBooks.subscribe((filteredBookNames) => {});
  }

  private _filterBooks(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();

    return this.bookService.getNames(value).pipe(
      map((response: any) => {
        if (response.books) {
          const combinedArray = response.books;
          this.searchService.updateSearchResults(combinedArray);
          return combinedArray.filter(
            (item: any) =>
              (item.name?.toLowerCase() ?? '').includes(filterValue) ||
              (item.title?.toLowerCase() ?? '').includes(filterValue)
          );
        } else {
          return [];
        }
      })
    );
  }
}
