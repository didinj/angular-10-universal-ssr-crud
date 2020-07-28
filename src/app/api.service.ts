import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Book } from './book';
import { Injectable } from '@angular/core';

const apiUrl = 'http://192.168.0.7/book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.message}`);
    return throwError(
      'Something bad happened; please try again later.');
  }

  getBooks(): Observable<any> {
    return this.http.get<Book[]>(apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBook(id: number): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      catchError(this.handleError)
    );
  }

  addBook(book: Book): Observable<any> {
    return this.http.post<Book>(apiUrl, book).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(id: any, book: Book): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, book).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Book>(url).pipe(
      catchError(this.handleError)
    );
  }
}
