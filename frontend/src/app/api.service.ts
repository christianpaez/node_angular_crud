import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Orden } from './ordenes';
import { Item } from './items';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://xpectrum-backend.herokuapp.com'
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
        tap(/* orden => console.log('Fetched Ordenes') */),
        catchError(this.handleError('getOrdenes', []))
      );
    }

    addOrden(orden: Orden): Observable<Orden> {
      return this.http.post<Orden>(`${apiUrl}/ordenes`, orden, httpOptions).pipe(
        tap(/* (orden: Orden) => console.log(`Creada orden id: =${orden._id}`) */),
        catchError(this.handleError<Orden>('addOrden'))
      );
    }

  getOrden(id: string): Observable<Orden> {
    const url = `${apiUrl}/ordenes/${id}`;
    return this.http.get<Orden>(url).pipe(
      tap(/* _id => console.log(`Cargada orden id: ${id}`) */),
      catchError(this.handleError<Orden>(`getOrden id=${id}`))
    );
  }

  updateOrden(id: any, orden: Orden): Observable<any> {
    const url = `${apiUrl}/ordenes/${id}`;
    return this.http.put(url, orden, httpOptions).pipe(
      tap(/* _ => console.log(`Orden actualizada id: ${id}`) */),
      catchError(this.handleError<any>('updateOrden'))
    );
  }

  addItem(item: Item, id): Observable<Item> {
    return this.http.post<Item>(`${apiUrl}/ordenes/${id}/items`, item, httpOptions).pipe(
      tap((orden: any) => console.log(`Creado item para orden id: =${orden._id}`)),
      catchError(this.handleError<Orden>('addItem'))
    );
  }
  deleteItem(idOrden: string, idItem: string): Observable<Item> {
    const url = `${apiUrl}/ordenes/${idOrden}/items/${idItem}`;
    return this.http.delete<Item>(url, httpOptions).pipe(
      tap(/* id => console.log(`Eliminado Ítem id: ${idItem}`) */),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

}
