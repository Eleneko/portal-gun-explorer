import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ApiResponse, Character } from '../../../models/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource = new MatTableDataSource<Character>();

  selectedCharacter: Character | null = null;
  favoriteCharacter: Character | null = null;

  filters = {
    name: '',
    status: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const params = {
      name: this.filters.name,
      status: this.filters.status
    };

    this.apiService.getData(params).subscribe((response: ApiResponse) => {
      this.dataSource.data = response.results;
      this.dataSource.paginator = this.paginator;
    });
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
  }

  setFavoriteCharacter(character: Character) {
    this.favoriteCharacter = character;
  }

  // #region FILTER 
  applyFilters() {
    this.getData();
  }

  clearFilters() {
    this.filters = {
      name: '',
      status: ''
    };
    this.applyFilters();
  }
  //#endregion

  clearSelectedCharacter() {
    this.selectedCharacter = null; 
  }
}