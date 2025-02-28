import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Character, Episode, Location, Origin } from '../models/interfaces';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnChanges {
  @Input() character!: Character;
  @Output() clearCharacterEvent = new EventEmitter<void>();
  
  isLoading = true;
  panelOpenState = false;

  origin: Origin | null = null;
  originResident: Character | null = null; 
  location: Location | null = null;
  locationResident: Character | null = null;
  episode: Episode | null = null;

  constructor(private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character) {
      this.loadDetails();
    }
  }

  loadDetails() {
    this.isLoading = true;

    this.origin = null;
    this.originResident = null;
    this.location = null;
    this.locationResident = null;
    this.episode = null;

    if (this.character.origin.url) {
      this.apiService.getOrigin(this.character.origin.url).subscribe((data: Origin) => {
        this.origin = data;
        if (data.residents && data.residents.length > 0) {
          this.loadResident(data.residents[0], 'origin');
        }
        this.checkLoadingComplete();
      });
    }

    if (this.character.location.url) {
      this.apiService.getLocation(this.character.location.url).subscribe((data: Location) => {
        this.location = data;
        if (data.residents && data.residents.length > 0) {
          this.loadResident(data.residents[0], 'location');
        }
        this.checkLoadingComplete();
      });
    }

    if (this.character.episode.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.character.episode.length);
      const randomEpisodeUrl = this.character.episode[randomIndex];
  
      this.apiService.getEpisode(randomEpisodeUrl).subscribe(
        (data: Episode) => {
          this.episode = data;
          this.checkLoadingComplete();
        },
        (error) => {
          console.error('Error al cargar el episodio:', error);
          this.checkLoadingComplete();
        }
      );
    } else {
      this.checkLoadingComplete();
    }
  }
  
  loadResident(residentUrl: string, type: 'origin' | 'location') {
    if (residentUrl) {
      this.apiService.getCharacterByUrl(residentUrl).subscribe(
        (data: Character) => {
          if (type === 'origin') {
            this.originResident = data;
          } else {
            this.locationResident = data;
          }
        },
        () => {
          if (type === 'origin') {
            this.originResident = null;
          } else {
            this.locationResident = null;
          }
        }
      );
    }
  }

  checkLoadingComplete() {
    if (
      (this.character.location.url ? this.location !== null : true) &&
      (this.character.origin.url ? this.origin !== null : true) &&
      (this.character.episode.length > 0 ? this.episode !== null : true)
    ) {
      this.isLoading = false;
    }
  }

  clearCharacter() {
    this.clearCharacterEvent.emit(); 
  }
}