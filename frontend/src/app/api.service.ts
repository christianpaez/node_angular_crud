import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Orden } from './ordenes';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //REQUESTS

  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${apiUrl}/ordenes`)
      .pipe(
        tap(orden => console.log('Fetched Ordenes')),
        catchError(this.handleError('getOrdenes', []))
      );
    }

    addOrden(orden: Orden): Observable<Orden> {
      return this.http.post<Orden>(`${apiUrl}/ordenes`, orden, httpOptions).pipe(
        tap((orden: Orden) => console.log(`Creada orden id: =${orden._id}`)),
        catchError(this.handleError<Orden>('addOrden'))
      );
    }

  getOrden(id: string): Observable<Orden> {
    const url = `${apiUrl}/ordenes/${id}`;
    return this.http.get<Orden>(url).pipe(
      tap(_ => console.log(`Cargada orden id: ${id}`)),
      catchError(this.handleError<Orden>(`getOrden id=${id}`))
    );
  }
  
  /* getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  } */
  
  /* updateProduct(id: any, product: Product): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  } */
  
  /* deleteProduct(id: any): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  } */

}
