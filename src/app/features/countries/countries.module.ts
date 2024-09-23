import { NgModule } from '@angular/core';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountriesDetailsComponent } from './components/countries-details/countries-details.component';
import { CountriesCardComponent } from './components/countries-card/countries-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterModule } from '../filter/filter.module';
import { PaginationModule } from '../pagination/pagination.module';
import { SearchBoxModule } from '../search-box/search-box.module';
import { SortModule } from '../sort/sort.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CountriesListComponent,
    CountriesCardComponent,
    CountriesDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FilterModule,
    PaginationModule,
    SearchBoxModule,
    SortModule
  ]
})
export class CountriesModule { }
