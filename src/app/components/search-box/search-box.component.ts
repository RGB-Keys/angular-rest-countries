import { Component, EventEmitter, Output } from '@angular/core';
import { CountryService } from 'src/app/services/country-api/country.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  constructor(private countryService: CountryService) {}

  onSearch(): void {
    this.countryService.setSearchTerm(this.searchTerm.trim());
  }
}