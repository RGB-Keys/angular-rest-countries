import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CountriesCardComponent } from './components/countries-card/countries-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FilterComponent } from './components/filter/filter.component';
import { SelectComponent } from './components/select/select.component';
import { SortComponent } from './components/sort/sort.component';


@NgModule({
  declarations: [
    AppComponent,
    CountriesListComponent,
    PaginationComponent,
    CountriesCardComponent,
    SearchBoxComponent,
    FilterComponent,
    SelectComponent,
    SortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
