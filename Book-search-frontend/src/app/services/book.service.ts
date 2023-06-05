import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from '../Books';
import { Authors } from '../Authors';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrlBooks = '/api/books';
  private apiUrlAuthors = '/api/authors';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(this.apiUrlBooks);
  }

  deleteBook(book: Books): Observable<Books> {
    const url = `${this.apiUrlBooks}/${book.id}`;
    return this.http.delete<Books>(url);
  }

  addBook(book: Books): Observable<Books> {
    return this.http.post<Books>(this.apiUrlBooks, book, httpOptions);
  }

  updateBook(bookId: number, updatedBook: Partial<Books>): Observable<Books> {
    const url = `${this.apiUrlBooks}/${bookId}`;
    return this.http.put<Books>(url, updatedBook, httpOptions);
  }

  addAuthor(author: Authors): Observable<Authors> {
    return this.http.post<Authors>(this.apiUrlAuthors, author, httpOptions);
  }
}
