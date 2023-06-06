import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { SearchService } from '../../services/search.service';
import { BookUpdateService } from '../../services/book-update.service';
import { Books } from '../../Books';
import { Authors } from '../../Authors';

@Component({
  selector: 'app-books-display',
  templateUrl: './books-display.component.html',
  styleUrls: ['./books-display.component.css'],
})
export class BooksDisplayComponent {
  books: Books[] = [];
  authors: Authors[] = [];

  constructor(
    private bookService: BookService,
    private searchService: SearchService,
    private bookUpdateService: BookUpdateService
  ) {}

  ngOnInit() {
    this.bookUpdateService.bookAdded$.subscribe(() => {
      this.bookService.getBooks().subscribe((books) => {
        this.books = books;
      });
    });
    this.searchService.searchResults$.subscribe((results: Books[]) => {
      this.books = results;
    });
    this.bookService.getAuthor().subscribe((authors) => {
      this.authors = authors;
    });
  }

  deleteBook(book: Books) {
    this.bookService
      .deleteBook(book)
      .subscribe(
        () => (this.books = this.books.filter((b) => b.id !== book.id))
      );
  }

  deleteAuthor(author: Authors) {
    this.bookService
      .deleteAuthor(author)
      .subscribe(
        () =>
          (this.books = this.books.filter((b) => b.author_name !== author.name))
      );
  }

  updateBook(bookId: number | undefined, updatedBook: Partial<Books>) {
    if (bookId === undefined) {
      console.error('Invalid book ID');
      return;
    }

    this.bookService.updateBook(bookId, updatedBook).subscribe();
    this.bookUpdateService.triggerBookAdded();
  }

  updateAuthor(authorId: number | undefined, updatedAuthor: Partial<Authors>) {
    if (authorId === undefined) {
      console.error('Invalid author ID');
      return;
    }
    this.bookService.updateAuthor(authorId, updatedAuthor).subscribe();
    this.bookUpdateService.triggerBookAdded();
  }
}
