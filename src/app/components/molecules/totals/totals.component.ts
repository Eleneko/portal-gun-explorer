import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/interfaces';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent {
  @Input() characters: Character[] = [];

  get totalsBySpecies() {
    const speciesCount: { [key: string]: number } = {};
    this.characters.forEach(character => {
      const species = character.species;
      speciesCount[species] = (speciesCount[species] || 0) + 1;
    });
    return speciesCount;
  }

  get totalsByType() {
    const typeCount: { [key: string]: number } = {};
    this.characters.forEach(character => {
      const type = character.type || 'N/A';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    return typeCount;
  }
}
