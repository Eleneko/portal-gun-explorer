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
  @Input() characters: Character[] = [];
  @Output() characterSelected = new EventEmitter<Character>();
  displayedColumns: string[] = ['image', 'name', 'status', 'species', 'type', 'gender', 'created'];
  dataSource = new MatTableDataSource<Character>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
}
