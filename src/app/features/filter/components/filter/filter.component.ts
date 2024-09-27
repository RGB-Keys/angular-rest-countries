import { Component } from '@angular/core';
import { FilterService } from '../../services/filter/filter.service';
import { getSelectValue, showOptionsVisibility } from 'src/app/shared/utils/event-utils';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  showFilters = false;

  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  subRegions = ['Northern Africa', 'Western Asia', 'Southern Europe'];
  populationRanges = ['<1M', '1M-10M', '10M-100M', '>100M'];

  constructor(private filterService: FilterService) {}

  onRegionChange(event: Event) {
    const selectedRegion = getSelectValue(event);
    this.filterService.setRegion(selectedRegion);
  }

  onSubRegionChange(event: Event) {
    const selectedSubRegion = getSelectValue(event);
    this.filterService.setSubRegion(selectedSubRegion);
  }

  onPopulationRangeChange(event: Event) {
    const selectedRange = getSelectValue(event);
    this.filterService.setPopulationRange(selectedRange);
  }

  toogleFilters() {
    this.showFilters = showOptionsVisibility(this.showFilters);
  }

}
