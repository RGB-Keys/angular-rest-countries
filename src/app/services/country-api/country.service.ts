import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Country } from '../../models/countries/countries.module';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = "https://restcountries.com/v3.1/all";
  private searchTerm$ = new BehaviorSubject<string>('');
  private page$ = new BehaviorSubject<number>(1);
  private pageSize$ = new BehaviorSubject<number>(12);


  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.apiUrl).pipe(
      map(countries => countries.filter(country => 
        country.name?.common &&
        country.flags?.png &&
        country.capital?.length > 0 &&
        country.region
      ))
    );
  }

  getPaginatedAndFilteredCountries(): Observable<Country[]> {
    return combineLatest([
      this.getCountries(),
      this.searchTerm$,
      this.page$,
      this.pageSize$
    ]).pipe(
      map(([countries, searchTerm, page, pageSize]) => {
        const filteredCountries = countries.filter(country =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const startIndex = (page - 1) * pageSize;
        return filteredCountries.slice(startIndex, startIndex + pageSize);
      })
    );
  }

  getTotalFilteredCountries(searchTerm: string = ''): Observable<number> {
    return combineLatest([
      this.getCountries(),
      this.searchTerm$
    ]).pipe(
      map(([countries, searchTerm]) => {
        return countries.filter(country =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        ).length;
      })
    );
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
  }

  setPage(page: number): void {
    this.page$.next(page);
  }

  setPageSize(pageSize: number): void {
    this.pageSize$.next(pageSize);
  }

}