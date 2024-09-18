import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../models/countries/countries.module';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl = "https://restcountries.com/v3.1/all"


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

  getPaginatedCountries(page: number, pageSize: number): Observable<Country[]> {
    return this.getCountries().pipe(
      map(countries => {
        const startIndex = (page - 1) * pageSize;
        return countries.slice(startIndex, startIndex + pageSize);
      })
    )
  }
}