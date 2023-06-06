import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Books } from '../Books';
import { catchError, tap } from 'rxjs/operators';
import { Authors } from '../Authors';
import { ToastrService } from 'ngx-toastr';

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
  private apiUrlSearch = '/api/search';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(this.apiUrlBooks).pipe(
      catchError((error) => {
        const errorMessage: string = error.error.error;
        this.toastr.error(errorMessage, 'Error');
        return throwError({ message: errorMessage, error });
      })
    );
  }

  addBook(book: Books): Observable<Books> {
    return this.http.post<Books>(this.apiUrlBooks, book, httpOptions).pipe(
      tap(() => {
        const successMessage: string = 'The book was added successfully.';
        this.toastr.success(successMessage, 'Success');
      }),
      catchError((error) => {
        const errorMessage: string = error.error.error;
        this.toastr.error(errorMessage, 'Error');
        return throwError({ message: errorMessage, error });
      })
    ) as Observable<Books>;
  }

  deleteBook(book: Books): Observable<Books> {
    const url = `${this.apiUrlBooks}/${book.id}`;
    return this.http.delete<Books>(url).pipe(
      tap(() => {
        const successMessage: string = 'The book was deleted successfully.';
        this.toastr.success(successMessage, 'Success');
      }),
      catchError((error) => {
        const errorMessage: string = error.error.error;
        this.toastr.error(errorMessage, 'Error');
        return throwError({ message: errorMessage, error });
      })
    ) as Observable<Books>;
  }

  updateBook(bookId: number, updatedBook: Partial<Books>): Observable<Books> {
    const url = `${this.apiUrlBooks}/${bookId}`;
    return this.http.put<Books>(url, updatedBook, httpOptions).pipe(
      tap(() => {
        const successMessage: string = 'The book was update successfully.';
        this.toastr.success(successMessage, 'Success');
      }),
      catchError((error) => {
        const errorMessage: string = error.error.error;
        this.toastr.error(errorMessage, 'Error');
        return throwError({ message: errorMessage, error });
      })
    ) as Observable<Books>;
  }

  getAuthor(): Observable<Authors[]> {
    return this.http.get<Authors[]>(this.apiUrlAuthors).pipe(
      catchError((error) => {
        const errorMessage: string = error.error.error;
        this.toastr.error(errorMessage, 'Error');
        return throwError({ message: errorMessage, error });
      })
    );
  }

  addAuthor(author: Authors): Observable<Authors> {
    return this.http
      .post<Authors>(this.apiUrlAuthors, author, httpOptions)
      .pipe(
        tap(() => {
          const successMessage: string = 'The author was added successfully.';
          this.toastr.success(successMessage, 'Success');
        }),
        catchError((error) => {
          const errorMessage: string = error.error.error;
          this.toastr.error(errorMessage, 'Error');
          return throwError({ message: errorMessage, error });
        })
      ) as Observable<Authors>;
  }

  updateAuthor(
    authorId: number,
    updatedAuthor: Partial<Authors>
  ): Observable<Authors> {
    const url = `${this.apiUrlAuthors}/${authorId}`;
    return this.http.put<Authors>(url, updatedAuthor, httpOptions).pipe(
      tap(() => {
        const successMessage: string = 'The author was updated successfully.';
        this.toastr.success(successMessage, 'Success');
      }),
      catchError((error) => {
        const errorMessage: string = error.error.error;
        this.toastr.error(errorMessage, 'Error');
        return throwError({ message: errorMessage, error });
      })
    ) as Observable<Authors>;
  }

  deleteAuthor(author: Authors): Observable<Authors> {
    const url = `${this.apiUrlAuthors}/${author.id}`;
    return this.http.delete<Authors>(url).pipe(
      tap(() => {
        const successMessage: string = 'The author was deleted successfully.';
        this.toastr.success(successMessage, 'Success');
      }),
      catchError((error) => {
        const errorMessage: string = error.error.error;
        this.toastr.error(errorMessage, 'Error');
        return throwError({ message: errorMessage, error });
      })
    ) as Observable<Authors>;
  }

  getNames(name: string): Observable<Books[]> {
    const url = `${this.apiUrlSearch}?name=${name}`;
    return this.http.get<Books[]>(url).pipe(
      catchError((error) => {
        const errorMessage: string = error.error.error;
        this.toastr.error(errorMessage, 'Error');
        return throwError({ message: errorMessage, error });
      })
    );
  }
}
