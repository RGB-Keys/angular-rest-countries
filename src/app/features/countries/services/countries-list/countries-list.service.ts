import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { Country } from 'src/app/features/countries/models/country.model';
import { CountryDataService } from '../country-data/country-data.service';
import { FilterService } from 'src/app/features/filter/services/filter/filter.service';
import { PaginateService } from 'src/app/features/pagination/services/paginate/paginate.service';
import { SearchService } from 'src/app/features/search-box/services/search/search.service';
import { SortService } from 'src/app/features/sort/services/sort/sort.service';
import { CountryFilters } from 'src/app/features/filter/model/country-filters.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesListService {

  constructor(
    private countryDataService: CountryDataService,
    private filterService: FilterService,
    private searchService: SearchService,
    private paginateService: PaginateService,
    private sortService: SortService
  ) { }

  private combinedObservables$ = combineLatest([
    this.countryDataService.getCountries(),
    this.filterService.getFilters(),
    this.searchService.getSearchTerm(),
    this.paginateService.getCurrentPage(),
    this.paginateService.getPageSize(),
    this.sortService.getSortCriteria()
  ]);


  getPaginatedAndFilteredCountries(): Observable<Country[]> {
    return this.combinedObservables$.pipe(
      switchMap(([countries, filters, searchTerm, page, pageSize, sortCriteria]) => {
        return this.filterSortPaginate(countries, filters, searchTerm, page, pageSize, sortCriteria);
      })
    );
  }

  getTotalFilteredCountries(): Observable<number> {
    return this.combinedObservables$.pipe(
      map(([countries, filters, searchTerm]) => {
        return this.filterService.getFilteredCountries(countries, filters, searchTerm).length;
      })
    );
  }

  private filterSortPaginate(countries: Country[], filters: CountryFilters, searchTerm: string, page: number, pageSize: number, sortCriteria: string): Observable<Country[]> {
    const filteredCountries = this.filterService.getFilteredCountries(countries, filters, searchTerm);
    const sortedCountries = this.sortService.sortCountries(filteredCountries, sortCriteria);
    return of(this.paginateService.getPaginateCountries(sortedCountries, page, pageSize));
  }

}