import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/countries/countries.module';
import { PaginateService } from 'src/app/services/paginate/paginate.service';
import { SearchPaginateFilterService } from 'src/app/services/seach-paginate-filter/search-paginate-filter.service';
import { SearchService } from 'src/app/services/search/search.service';


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

  constructor(
    private searchPaginateFilterService: SearchPaginateFilterService,
    private searchService: SearchService,
    private paginateService: PaginateService,
    private router: Router
  ){ 
    this.countries$ = this.searchPaginateFilterService.getPaginatedAndFilteredCountries();
    this.totalCountries$ = this.searchPaginateFilterService.getTotalFilteredCountries();
  }

  ngOnInit(): void {
    this.loadCountries();
    this.onSearch();
  }

  loadCountries(): void {
    this.OnPage();
  }

  onSearch(): void {
    this.searchService.getSearchTerm().subscribe(searchTerm => {
      this.resetFilter(searchTerm);
    });
  }

  resetFilter(searchTerm: string): void {
    this.currentPage = 1;
    this.loadCountries();
  }

  OnPage(): void {
    this.paginateService.setPage(this.currentPage);
    this.paginateService.setPageSize(this.pageSize);
    this.searchPaginateFilterService.getTotalFilteredCountries().subscribe(total => {
      this.totalCountries = total;
    });
  } 

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCountries();
  }

  goToCountriesDetails(country: Country): void {
    this.router.navigate(['/country', country.name.common]);
  }
}