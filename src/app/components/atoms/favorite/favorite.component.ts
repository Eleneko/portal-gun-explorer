import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../../models/interfaces';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent {
  @Input() favoriteCharacter: Character | null = null;
  @Output() characterSelected = new EventEmitter<Character>();

  selectCharacter() {
    if (this.favoriteCharacter) {
      this.characterSelected.emit(this.favoriteCharacter);
    }
  }
}
