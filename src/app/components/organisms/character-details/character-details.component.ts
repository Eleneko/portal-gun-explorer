import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Character, Episode, Origin, Location } from 'src/app/models/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { CharacterDetailsService } from 'src/app/services/character-details.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnChanges, OnDestroy {
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

  private destroy$ = new Subject<void>(); 

  constructor(
    private characterDetailsService: CharacterDetailsService,
    private apiService: ApiService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character) {
      this.loadDetails();
    }
  }

  loadDetails() {
    this.isLoading = true;

    if (this.character.origin.url) {
      this.characterDetailsService.loadOriginDetails(this.character.origin.url).pipe(
        takeUntil(this.destroy$)
      ).subscribe(({ origin, residents }) => {
        this.origin = origin;
        this.originResidents = residents;
        this.checkLoadingComplete();
      });
    }

    if (this.character.location.url) {
      this.characterDetailsService.loadLocationDetails(this.character.location.url).pipe(
        takeUntil(this.destroy$)
      ).subscribe(({ location, residents }) => {
        this.location = location;
        this.locationResidents = residents;
        this.checkLoadingComplete();
      });
    }

    if (this.character.episode.length > 0) {
      this.characterDetailsService.loadRandomEpisode(this.character.episode).pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        episode => {
          this.episode = episode;
          this.checkLoadingComplete();
        },
        error => {
          console.error('Error al cargar el episodio:', error);
          this.checkLoadingComplete();
        }
      );
    } else {
      this.checkLoadingComplete();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(); 
    this.destroy$.complete(); 
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
