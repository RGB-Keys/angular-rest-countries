import { Component } from '@angular/core';
import { Country } from 'src/app/models/countries/countries.module';
import { CountryService } from 'src/app/services/country.service';


@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent {
  countries: Country[] = [];
  currentPage = 1;
  pageSize = 12;
  totalCountries = 0;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe((countries) => {
      this.totalCountries = countries.length;
      this.countryService.getPaginatedCountries(this.currentPage, this.pageSize)
      .subscribe(paginatedCountries => {
        this.countries = paginatedCountries;
      });
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCountries();
  }
}
