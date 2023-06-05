import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Books } from '../../Books';
import { Authors } from '../../Authors';

@Component({
  selector: 'app-updating-objects-area',
  templateUrl: './updating-objects-area.component.html',
  styleUrls: ['./updating-objects-area.component.css'],
})
export class UpdatingObjectsAreaComponent {
  books: Books[] = [];
  authors: Authors[] = [];

  constructor(private bookService: BookService) {}

  openBooks = false;

  toggleOpenBooks() {
    this.openBooks = !this.openBooks;
  }

  addBook(book: Books) {
    this.bookService.addBook(book).subscribe((book) => this.books.push(book));
  }

  addAuthor(author: Authors) {
    this.bookService
      .addAuthor(author)
      .subscribe((author) => this.authors.push(author));
  }
}
