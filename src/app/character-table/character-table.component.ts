import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Character } from '../models/interfaces';

@Component({
  selector: 'app-character-table',
  templateUrl: './character-table.component.html',
  styleUrls: ['./character-table.component.css']
})
export class CharacterTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() characters: Character[] = [];
  @Output() characterSelected = new EventEmitter<Character>();
  @Output() favoriteSelected = new EventEmitter<Character>();

  displayedColumns: string[] = ['favorite', 'image', 'name', 'status', 'species', 'type', 'gender', 'created'];
  dataSource = new MatTableDataSource<Character>();

  favoriteCharacter: Character | undefined = undefined;

  ngOnInit(): void {
    this.dataSource.data = this.characters;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.characters;
    this.dataSource.paginator = this.paginator;
  }

  selectCharacter(character: Character) {
    this.characterSelected.emit(character);
  }

  markAsFavorite(character: Character) {
    this.favoriteSelected.emit(character);
  }

  toggleFavorite(character: Character) {
    this.favoriteCharacter = this.favoriteCharacter === character ? undefined : character;
    this.favoriteSelected.emit(this.favoriteCharacter);
  }
  
}
