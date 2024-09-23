import { Component } from '@angular/core';
import { SortService } from '../services/sort.service';
import { getSelectValue } from 'src/app/shared/utils/event-utils';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  sortOptionsAsc = [
    { label: 'All', value: '' },
    { label: 'Name', value: 'nameAsc' },
    { label: 'Population', value: 'populationAsc' },
    { label: 'Area', value: 'areaAsc' }
  ];

  sortOptionsDesc = [
    { label: 'All', value: '' },
    { label: 'Name', value: 'nameDesc' },
    { label: 'Population', value: 'populationDesc' },
    { label: 'Area', value: 'areaDesc' }
  ];

  constructor(private sortService: SortService) {}

  onSortChange(event: Event) {
    const sortCriteria = getSelectValue(event);
    this.sortService.setSortCriteria(sortCriteria);
  }
}
