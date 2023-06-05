import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  filteredBooks!: Observable<string[]>;
  filteredAuthors!: Observable<string[]>;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.filteredBooks = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterBooks(value))
    );

    this.filteredAuthors = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterAuthors(value))
    );
  }

  private filterBooks(value: string): string[] {
    // Implement your logic to filter book names based on the value
    // You can use the bookService to fetch book names and perform filtering
    // Return an array of filtered book names
  }

  private filterAuthors(value: string): string[] {
    // Implement your logic to filter author names based on the value
    // You can use the authorService to fetch author names and perform filtering
    // Return an array of filtered author names
  }
}
