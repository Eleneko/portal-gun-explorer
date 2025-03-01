import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; 
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Origin, Character, Location, Episode } from '../models/interfaces'; 

@Injectable({ providedIn: 'root' })
export class CharacterDetailsService {
  constructor(private apiService: ApiService) {}

  loadOriginDetails(url: string): Observable<{ origin: Origin, residents: Character[] }> {
    return this.apiService.getOrigin(url).pipe(
      switchMap(origin => {
        const residentsUrls = origin.residents.slice(0, 5); 
        const residentRequests = residentsUrls.map(url => this.apiService.getCharacterByUrl(url));
        return forkJoin(residentRequests).pipe(
          map(residents => ({ origin, residents }))
        );
      })
    );
  }

  loadLocationDetails(url: string): Observable<{ location: Location, residents: Character[] }> {
    return this.apiService.getLocation(url).pipe(
      switchMap(location => {
        const residentsUrls = location.residents.slice(0, 5); 
        const residentRequests = residentsUrls.map(url => this.apiService.getCharacterByUrl(url));
        return forkJoin(residentRequests).pipe(
          map(residents => ({ location, residents }))
        );
      })
    );
  }

  loadRandomEpisode(episodeUrls: string[]): Observable<Episode> {
    const randomIndex = Math.floor(Math.random() * episodeUrls.length);
    return this.apiService.getEpisode(episodeUrls[randomIndex]);
  }
}