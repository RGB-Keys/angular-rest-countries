import { Component, Input } from '@angular/core';
import { Country } from '../../models/country.model';


@Component({
  selector: 'app-countries-card',
  templateUrl: './countries-card.component.html',
  styleUrls: ['./countries-card.component.css']
})
export class CountriesCardComponent {
  @Input() country!: Country;

  get countryName(): string {
    return this.country.name.common;
  }

  get flagUrl(): string {
    return this.country.flags?.png;
  }

  get capital(): string {
    return this.country.capital?.[0];
  }

  get region(): string {
    return this.country.region;
  }

}