import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Books } from '../../Books';

@Component({
  selector: 'app-books-display',
  templateUrl: './books-display.component.html',
  styleUrls: ['./books-display.component.css'],
})
export class BooksDisplayComponent {
  books: Books[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  deleteBook(book: Books) {
    this.bookService
      .deleteBook(book)
      .subscribe(
        () => (this.books = this.books.filter((b) => b.id !== book.id))
      );
  }

  updateBook(bookId: number | undefined, updatedBook: Partial<Books>) {
    if (bookId === undefined) {
      console.error('Invalid book ID');
      return;
    }

    this.bookService.updateBook(bookId, updatedBook).subscribe(
      (response) => {
        console.log('Book updated successfully:', response);
        // Handle any further actions or notifications upon successful update
      },
      (error) => {
        console.error('Error updating book:', error);
        // Handle any error notifications or error handling logic
      }
    );
  }
}
