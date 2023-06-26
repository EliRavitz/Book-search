import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput', { static: true })
  searchInputRef!: ElementRef<HTMLInputElement>;
  searchControl = new FormControl();
  filteredBooks: Observable<string[]> | undefined;
  private searchValueSubject = new Subject<string>();

  constructor(
    private bookService: BookService,
    private searchService: SearchService
  ) {}

  ngAfterViewInit() {
    this.fetchAllData();
  }

  private fetchAllData() {
    this.bookService.getNames('').subscribe((response: any) => {
      if (response.books) {
        const combinedArray = response.books;
        this.searchService.updateSearchResults(combinedArray);
      }
    });
  }

  ngOnInit() {
    this.filteredBooks = this.searchValueSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this.bookService.getNames(value)),
      map((response: any) => {
        if (response.books) {
          const filterValue = this.searchControl.value.toLowerCase();
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

    this.filteredBooks.subscribe((filteredBookNames) => {});
  }

  onSearchValueChange(value: string) {
    this.searchValueSubject.next(value);
  }
}
