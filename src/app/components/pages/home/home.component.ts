import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ApiResponse, Character } from '../../../models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../atoms/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<Character>();
  selectedCharacter: Character | null = null;
  favoriteCharacter: Character | null = null;
  characterModal: Character | null = null;

  filters = {
    name: '',
    status: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const params = {
      name: this.filters.name,
      status: this.filters.status,
    };

    this.apiService.getData(params).subscribe((response: ApiResponse) => {
      this.dataSource.data = response.results;
      this.dataSource.paginator = this.paginator;
    });
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
  }

  openModal(character: Character) {
    this.characterModal = character;
    this.dialog.open(ModalComponent, {
      data: this.characterModal
    });
  }

  setFavoriteCharacter(character: Character) {
    this.favoriteCharacter = character;
  }

  applyFilters() {
    this.getData();
  }

  clearFilters() {
    this.filters = {
      name: '',
      status: '',
    };
    this.applyFilters();
  }

  clearSelectedCharacter() {
    this.selectedCharacter = null;
  }
}