import { Component, EventEmitter, Output } from '@angular/core';
import { SearchService } from 'src/app/features/search-box/services/search/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    this.searchService.setSearchTerm(this.searchTerm.trim());
  }
}