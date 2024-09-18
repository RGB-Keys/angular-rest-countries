import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CountriesCardComponent } from './components/countries-card/countries-card.component';


@NgModule({
  declarations: [
    AppComponent,
    CountriesListComponent,
    PaginationComponent,
    CountriesCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
