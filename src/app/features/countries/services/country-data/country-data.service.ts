import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from 'src/app/features/countries/models/country.model';


@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private apiUrl = "https://restcountries.com/v3.1/all";
  private apiUrlByName = "https://restcountries.com/v3.1/name/";

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

  getCountryByName(countryName: string): Observable<Country | undefined> {
    const apiUrlByName = `${this.apiUrlByName}${countryName}`;
    return this.httpClient.get<Country[]>(apiUrlByName).pipe(
      map((countries: Country[]) => {
        return countries.length > 0 ? countries[0] : undefined;
      })
    );
  }
}