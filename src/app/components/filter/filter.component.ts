import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  subRegions = ['Northern Africa', 'Western Asia', 'Southern Europe'];
  populationRanges = ['<1M', '1M-10M', '10M-100M', '>100M'];

  constructor(private filterService: FilterService) {}

  onRegionChange(region: string) {
    this.filterService.setRegion(region);
  }

  onSubRegionChange(subRegion: string) {
    this.filterService.setSubRegion(subRegion);
  }

  onPopulationRangeChange(range: string) {
    this.filterService.setPopulationRange(range);
  }

}
