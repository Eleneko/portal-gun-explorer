import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Character, Episode, Location } from '../models/interfaces';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnChanges {
  @Input() character!: Character;
  episode: Episode | null = null;
  location: Location | null = null;
  isLoading = true;

  resident: Character | null = null;

  constructor(private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character) {
      this.loadDetails();
    }
  }

  loadDetails() {
    this.isLoading = true;
    this.location = null;
    this.episode = null;

    this.resident = null;

    if (this.character.location.url) {
      this.apiService.getLocation(this.character.location.url).subscribe((data: Location) => {
        this.location = data;
        if (data.residents && data.residents.length > 0) {
          this.loadResident(data.residents[0]);
        }
        this.checkLoadingComplete();
      });
    }

    if (this.character.episode.length > 0) {
      this.apiService.getEpisode(this.character.episode[0]).subscribe((data: Episode) => {
        this.episode = data;
        this.checkLoadingComplete();
      });
    }

    else {
      this.checkLoadingComplete();
    }
  }

  loadResident(residentUrl: string) {
    if (residentUrl) {
      this.apiService.getCharacterByUrl(residentUrl).subscribe(
        (data: Character) => {
          this.resident = data;
        },
        (error) => {
          console.error('Error al cargar el residente:', error);
          this.resident = null; 
        }
      );
    }
  }
  
  checkLoadingComplete() {
    if (
      (this.character.location.url ? this.location !== null : true) &&
      (this.character.episode.length > 0 ? this.episode !== null : true)
    ) {
      this.isLoading = false;
    }
  }
}