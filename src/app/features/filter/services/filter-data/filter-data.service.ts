import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CountryDataService } from 'src/app/features/countries/services/country-data/country-data.service';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  constructor(private countryDataService: CountryDataService) { }

  getRegionsAndSubregions(selectedRegion?: string): Observable<{ regions: string[], subregions: string[] }> {
    return this.countryDataService.getCountries().pipe(
      map(countries => {
        const regionsSet = new Set<string>();
        const subRegionsSet = new Set<string>();

        countries.forEach(country => {
          if (country.region) {
            regionsSet.add(country.region);
          }
          if (selectedRegion && country.region === selectedRegion && country.subregion) {
            subRegionsSet.add(country.subregion);
          }
        });

        return {
          regions: Array.from(regionsSet),
          subregions: Array.from(subRegionsSet)
        };
      })
    );
  }

  getPopulationRanges(): Observable<string[]> {
    const predefinedRanges = [
      { label: '<1M' },
      { label: '1M-10M' },
      { label: '10M-100M' },
      { label: '>100M' }
    ];
  
    return of(predefinedRanges.map(range => range.label));
  }
}
