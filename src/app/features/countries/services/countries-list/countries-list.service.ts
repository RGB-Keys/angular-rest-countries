import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { Country } from 'src/app/features/countries/models/country.model';
import { CountryDataService } from '../country-data/country-data.service';
import { FilterService } from 'src/app/features/filter/services/filter/filter.service';
import { PaginateService } from 'src/app/features/pagination/services/paginate/paginate.service';
import { SearchService } from 'src/app/features/search-box/services/search/search.service';
import { SortService } from 'src/app/features/sort/services/sort.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesListService {

  private combinedObservables$ = combineLatest([
    this.countryDataService.getCountries(),
    this.filterService.getRegion(),
    this.filterService.getSubRegion(),
    this.filterService.getPopulationRange(),
    this.searchService.getSearchTerm(),
    this.paginateService.getCurrentPage(),
    this.paginateService.getPageSize(),
    this.sortService.getSortCriteria()
  ]);

  constructor(
    private countryDataService: CountryDataService,
    private filterService: FilterService,
    private searchService: SearchService,
    private paginateService: PaginateService,
    private sortService: SortService
  ) { }

  getPaginatedAndFilteredCountries(): Observable<Country[]> {
    return this.combinedObservables$.pipe(
      switchMap(([countries, region, subRegion, populationRange, searchTerm, page, pageSize, sortCriteria]) => {
        return this.filterSortPaginate(countries, region, subRegion, populationRange, searchTerm, page, pageSize, sortCriteria);
      })
    );
  }

  getTotalFilteredCountries(): Observable<number> {
    return this.combinedObservables$.pipe(
      map(([countries, region, subRegion, populationRange, searchTerm]) => {
        return this.getFilteredCountries(countries, region, subRegion, populationRange, searchTerm).length;
      })
    );
  }

  private filterSortPaginate(countries: Country[], region: string, subRegion: string, populationRange: string, searchTerm: string, page: number, pageSize: number, sortCriteria: string): Observable<Country[]> {
    const filteredCountries = this.getFilteredCountries(countries, region, subRegion, populationRange, searchTerm);
    const sortedCountries = this.sortService.sortCountries(filteredCountries, sortCriteria);
    return of(this.paginateCountries(sortedCountries, page, pageSize));
  }

  private getFilteredCountries(countries: Country[], region: string, subRegion: string, populationRange: string, searchTerm: string): Country[] {
    return countries.filter(country => {
      const matchesRegion = !region || country.region === region;
      const matchesSubRegion = !subRegion || country.subregion === subRegion;
      const matchesPopulation = this.matchPopulationRange(country.population, populationRange);
      const matchesSearchTerm = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRegion && matchesSubRegion && matchesPopulation && matchesSearchTerm;
    });
  }

  private matchPopulationRange(population: number, range: string): boolean {
      switch (range) {
        case '<1M':
          return population < 1_000_000;
        case '1M-10M':
          return population >= 1_000_000 && population <= 10_000_000;
        case '10M-100M':
          return population > 10_000_000 && population <= 100_000_000;
        case '>100M':
          return population > 100_000_000;
        default:
          return true;
      }
    }

  private paginateCountries(countries: Country[], page: number, pageSize: number): Country[] {
    const startIndex = (page - 1) * pageSize;
    return countries.slice(startIndex, startIndex + pageSize);
  }
}