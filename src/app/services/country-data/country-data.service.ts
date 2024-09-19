import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../../models/countries/countries.module';


@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private apiUrl = "https://restcountries.com/v3.1/all";

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

  getRegions(): Observable<string[]> {
    return this.httpClient.get<any[]>(this.apiUrl).pipe(
      map(countries => Array.from(new Set(countries.map(country => country.region))).filter(Boolean))
    );
  }

  getSubRegions(region: string): Observable<string[]> {
    return this.httpClient.get<any[]>(this.apiUrl).pipe(
      map(countries => Array.from(new Set(countries.filter(country => country.region === region).map(country => country.subregion))).filter(Boolean))
    );
  }

  getPopulationRanges(): Observable<string[]> {
    return this.httpClient.get<any[]>(this.apiUrl).pipe(
      map(countries => {
        const populations = countries.map(country => country.population);
        return [
          '<1M',
          '1M-10M',
          '10M-100M',
          '>100M'
        ].filter(range => {
          return populations.some(population => this.matchPopulationRange(population, range));
        });
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
        return false;
    }
  }
}