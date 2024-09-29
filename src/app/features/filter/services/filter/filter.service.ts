import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from 'src/app/features/countries/models/country.model';
import { CountryFilters } from '../../model/country-filters.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters$ = new BehaviorSubject<CountryFilters>({
    region: '',
    subRegion: '',
    populationRange: ''
  });

  setRegion(region: string) {
    this.updateFilters({ region });
  }

  setSubRegion(subRegion: string) {
    this.updateFilters({ subRegion });
  }

  setPopulationRange(populationRange: string) {
    this.updateFilters({ populationRange });
  }

  getFilters(): Observable<CountryFilters> {
    return this.filters$.asObservable();
  }

  getFilteredCountries(countries: Country[], filters: CountryFilters, searchTerm: string): Country[] {
    return countries.filter(country => {
      return this.matchesFilters(country, filters, searchTerm);
    });
  }

  private updateFilters(partialFilters: Partial<CountryFilters>) {
    const currentFilters = this.filters$.getValue();
    this.filters$.next({ ...currentFilters, ...partialFilters });
  }

  private matchesFilters(country: Country, filters: CountryFilters, searchTerm: string): boolean {
    const matchesRegion = !filters.region || country.region === filters.region;
    const matchesSubRegion = !filters.subRegion || country.subregion === filters.subRegion;
    const matchesPopulation = this.matchPopulationRange(country.population, filters.populationRange);
    const matchesSearchTerm = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSubRegion && matchesPopulation && matchesSearchTerm;
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
}
