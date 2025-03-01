import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
// MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TotalsComponent } from './components/molecules/totals/totals.component';
import { CharacterTableComponent } from './components/organisms/character-table/character-table.component';
import { CharacterDetailsComponent } from './components/organisms/character-details/character-details.component';
// DIRECTIVES
import { KeyValueDirective } from './directives/key-value.directive';
// PIPES
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TagComponent } from './components/atoms/tag/tag.component';
import { CharacterSelectionEmptyComponent } from './components/organisms/character-selection-empty/character-selection-empty.component';
import { FavoriteComponent } from './components/atoms/favorite/favorite.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterTableComponent,
    CharacterDetailsComponent,
    TotalsComponent,
    KeyValueDirective,
    DateFormatPipe,
    TagComponent,
    CharacterSelectionEmptyComponent,
    FavoriteComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
