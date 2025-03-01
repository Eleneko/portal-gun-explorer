import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse, Location, Episode, Character, Origin } from '../models/interfaces';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getData(filters: any = {}): Observable<ApiResponse> {
    let params = new HttpParams();
    if (filters.name) params = params.set('name', filters.name);
    if (filters.status) params = params.set('status', filters.status);
    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        return of({
          results: [],
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null
          }
        } as ApiResponse);
      })
    );
  }

  getLocation(url: string): Observable<Location> {
    return this.http.get<Location>(url);
  }

  getOrigin(url: string): Observable<Origin> {
    return this.http.get<Origin>(url);
  }

  getEpisode(url: string): Observable<Episode> {
    return this.http.get<Episode>(url);
  }

  getCharacterByUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}