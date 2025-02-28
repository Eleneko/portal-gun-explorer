import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TotalsComponent } from './totals/totals.component';
import { MatCardModule } from '@angular/material/card';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { MatChipsModule } from '@angular/material/chips';
import { CharacterTableComponent } from './character-table/character-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { KeyValueDirective } from './directives/key-value.directive';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterTableComponent,
    CharacterDetailsComponent,
    TotalsComponent,
    KeyValueDirective 
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
