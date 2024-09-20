import { Component } from '@angular/core';
import { SortService } from 'src/app/services/sort/sort.service';

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
    const selectElement = event.target as HTMLSelectElement;
    const sortCriteria = selectElement.value;
    this.sortService.setSortCriteria(sortCriteria);
  }
}
