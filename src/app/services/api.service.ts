import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse  } from '../models/interfaces'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = "https://rickandmortyapi.com/api/character";

  constructor( private http: HttpClient) { }

  public getData(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.urlApi)
  }

}
