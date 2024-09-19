import { Injectable } from '@angular/core';
import { SearchService } from '../search/search.service';
import { PaginateService } from '../paginate/paginate.service';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { Country } from 'src/app/models/countries/countries.module';
import { CountryDataService } from '../country-data/country-data.service';
import { FilterService } from '../filter/filter.service';
import { SortService } from '../sort/sort.service';

@Injectable({
  providedIn: 'root'
})
export class SearchPaginateFilterService {

  private combinedObservables$ = combineLatest([
    this.countryDataService.getCountries(),
    this.filterService.getRegion(),
    this.filterService.getSubRegion(),
    this.filterService.getPopulationRange(),
    this.searchService.getSearchTerm(),
    this.paginateService.getPage(),
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
        return this.applyFilters(countries, region, subRegion, populationRange,searchTerm, page, pageSize, sortCriteria)
      })
    );
  }

  getTotalFilteredCountries(): Observable<number> {
    return this.combinedObservables$.pipe(
      map(([countries, region, subRegion, populationRange, searchTerm]) => {
        const filteredCountries = countries
          .filter(country => {
            const matchesRegion = region ? country.region === region : true;
            const matchesSubRegion = subRegion ? country.subregion === subRegion : true;
            const matchesPopulation = this.matchPopulationRange(country.population, populationRange);
            return matchesRegion && matchesSubRegion && matchesPopulation;
          })
          .filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
        return filteredCountries.length;
      })
    );
  }

  private applyFilters(countries: Country[], region: string,
     subRegion: string, populationRange: string, searchTerm: string,
     page: number, pageSize: number, sortCriteria: string): Observable<Country[]> {
      return of(countries).pipe(
        map(countries => {
          const filteredCountries = countries.filter(country => {
            const matchesRegion = !region || country.region === region;
            const matchesSubRegion = !subRegion || country.subregion === subRegion;
            const matchesPopulation = this.matchPopulationRange(country.population, populationRange);
            const matchesSearchTerm = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesRegion && matchesSubRegion && matchesPopulation && matchesSearchTerm;
          });

          const sortedCountries = this.sortService.sortCountries(filteredCountries, sortCriteria);
    
          return this.paginateCountries(sortedCountries, page, pageSize);
        })
      );
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
