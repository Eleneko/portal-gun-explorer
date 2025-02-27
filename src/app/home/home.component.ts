import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ApiResponse, Character } from '../models/interfaces'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data: Character[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.getData()
  }
  
  getData() {
    this.apiService.getData().subscribe((response: ApiResponse) => {
      this.data = response.results;
      console.log(this.data);
    });
  }
  
}
