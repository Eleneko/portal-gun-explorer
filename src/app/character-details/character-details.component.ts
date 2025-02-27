import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Character, Location, Episode } from '../models/interfaces';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  @Input() character!: Character; 
  episode: Episode | null = null; 
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.character) {
      this.loadDetails();
    }
  }

  loadDetails() {
    this.isLoading = true;
    if (this.character.episode.length > 0) {
      this.apiService.getEpisode(this.character.episode[0]).subscribe((data: Episode) => {
        this.episode = data;
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}