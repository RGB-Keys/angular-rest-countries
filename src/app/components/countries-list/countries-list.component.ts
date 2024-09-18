import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Country } from 'src/app/models/countries/countries.module';
import { CountryService } from 'src/app/services/country-api/country.service';


@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {
  countries$: Observable<Country[]>;
  totalCountries$: Observable<number>;
  currentPage = 1;
  pageSize = 12;
  totalCountries = 0;

  constructor(private countryService: CountryService) {
    this.countries$ = this.countryService.getPaginatedAndFilteredCountries();
    this.totalCountries$ = this.countryService.getTotalFilteredCountries();
  }

  ngOnInit(): void {
    this.loadCountries();
    this.onSearch();
  }

  loadCountries(): void {
    this.OnPage();
  }

  onSearch(): void {
    this.countryService.getSearchTerm().subscribe(searchTerm => {
      this.applyFilter(searchTerm);
    });
  }

  applyFilter(searchTerm: string): void {
    this.currentPage = 1;
    this.loadCountries();
  }

  OnPage(): void {
    this.countryService.setPage(this.currentPage);
    this.countryService.setPageSize(this.pageSize);
    this.countryService.getTotalFilteredCountries().subscribe(total => {
      this.totalCountries = total;
    });
  } 

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCountries();
  }
}