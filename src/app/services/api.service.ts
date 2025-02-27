import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Location, Episode, Character } from '../models/interfaces';

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
    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  getLocation(url: string): Observable<Location> {
    return this.http.get<Location>(url);
  }

  getEpisode(url: string): Observable<Episode> {
    return this.http.get<Episode>(url);
  }

  getCharacterByUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}