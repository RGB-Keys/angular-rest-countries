import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from 'src/app/models/countries/countries.module';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private sortCriteria$ = new BehaviorSubject<string>('');

  setSortCriteria(criteria: string) {
    this.sortCriteria$.next(criteria);
  }

  getSortCriteria(): Observable<string> {
    return this.sortCriteria$.asObservable();
  }

  sortCountries(countries: Country[], criteria: string): Country[] {
    switch (criteria) {
      case 'nameAsc':
        return [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
      case 'nameDesc':
        return [...countries].sort((a, b) => b.name.common.localeCompare(a.name.common));
      case 'populationAsc':
        return [...countries].sort((a, b) => a.population - b.population);
      case 'populationDesc':
        return [...countries].sort((a, b) => b.population - a.population);
      case 'areaAsc':
        return [...countries].sort((a, b) => (a.area || 0) - (b.area || 0));
      case 'areaDesc':
        return [...countries].sort((a, b) => (b.area || 0) - (a.area || 0));
      default:
        return countries;
    }
  }
}
