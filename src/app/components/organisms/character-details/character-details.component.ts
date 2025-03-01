import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Character, Episode, Origin, Location } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';

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
  originResidents: Character[] = [];
  location: Location | null = null;
  locationResidents: Character[] = [];
  
  episode: Episode | null = null;

  originResidentNames: string[] = [];
  locationResidentNames: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character) {
      this.loadDetails();
    }
  }
  
  loadDetails() {
    this.isLoading = true;

    this.origin = null;
    this.originResidents = [];
    this.location = null;
    this.locationResidents = [];
    this.episode = null;

    if (this.character.origin.url) {
      this.apiService.getOrigin(this.character.origin.url).subscribe((data: Origin) => {
        this.origin = data;
        if (data.residents && data.residents.length > 0) {
          this.loadResidents(data.residents, 'origin');
        }
        this.checkLoadingComplete();
      });
    }

    if (this.character.location.url) {
      this.apiService.getLocation(this.character.location.url).subscribe((data: Location) => {
        this.location = data;
        if (data.residents && data.residents.length > 0) {
          this.loadResidents(data.residents, 'location');
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

  loadResidents(residentsUrls: string[], type: 'origin' | 'location') {
    if (residentsUrls.length === 0) return;
  
    const shuffled = residentsUrls.sort(() => 0.5 - Math.random()).slice(0, 5);
    const requests = shuffled.map(url => this.apiService.getCharacterByUrl(url));
  
    Promise.allSettled(requests.map(req => req.toPromise()))
      .then((results) => {
        const validCharacters = results
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as PromiseFulfilledResult<Character>).value);
  
        if (type === 'origin') {
          this.originResidents = validCharacters.slice(0, 5);
          this.originResidentNames = this.originResidents.map(resident => resident.name);
        } else {
          this.locationResidents = validCharacters.slice(0, 5);
          this.locationResidentNames = this.locationResidents.map(resident => resident.name);
        }
      })
      .catch(() => {
        if (type === 'origin') {
          this.originResidents = [];
          this.originResidentNames = [];
        } else {
          this.locationResidents = [];
          this.locationResidentNames = [];
        }
      });
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
