import { Component } from '@angular/core';
import { SortService } from '../services/sort/sort.service';
import { getSelectValue, showOptionsVisibility } from 'src/app/shared/utils/event-utils';
import { SortOptions } from '../model/sort-options.model';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  showSortOption = false;

  sortOptions: SortOptions[] = [
    { label: '-', value: '' },
    { label: 'Name - Asc', value: 'nameAsc' },
    { label: 'Name - Desc', value: 'nameDesc' },
    { label: 'Population - Asc', value: 'populationAsc' },
    { label: 'Population - Desc', value: 'populationDesc' },
    { label: 'Area - Asc', value: 'areaAsc' },
    { label: 'Area - Desc', value: 'areaDesc' }
  ];

  constructor
  (private sortService: SortService) {}

  onSortChange(event: Event) {
    const sortCriteria = getSelectValue(event);
    this.sortService.setSortCriteria(sortCriteria);
  }

  toggleSortOption() {
    this.showSortOption = showOptionsVisibility(this.showSortOption);
  }
}
