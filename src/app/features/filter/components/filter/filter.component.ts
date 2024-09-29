import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter/filter.service';
import { getSelectValue, showOptionsVisibility } from 'src/app/shared/utils/event-utils';
import { CountryFilters } from '../../model/country-filters.model';
import { FilterOptions } from '../../model/filter-options.model';
import { FilterDataService } from '../../services/filter-data/filter-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  showFilters = false;

  filters: CountryFilters = {
    region: '',
    subRegion: '',
    populationRange: ''
  };

  filterOptions: FilterOptions[] = [
    {
      id: 'regionSelect',
      label: 'Região',
      options: [],
      onChange: (event: Event) => this.onFilterChange(event, 'region')
    },
    {
      id: 'subRegionSelect',
      label: 'Sub-região',
      options: [],
      onChange: (event: Event) => this.onFilterChange(event, 'subRegion'),
      disabled: true
    },
    {
      id: 'populationSelect',
      label: 'População',
      options: [],
      onChange: (event: Event) => this.onFilterChange(event, 'populationRange')
    }
  ];

  constructor
  (
  private filterService: FilterService,
  private filterDataService: FilterDataService
  )
   {}

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters() {
    this.filterDataService.getRegionsAndSubregions().subscribe(data => {
      this.filterOptions[0].options = data.regions;
    });
    
    this.filterDataService.getPopulationRanges().subscribe(ranges => {
        this.filterOptions[2].options = ranges;
    });

  }

  onFilterChange(event: Event, filterType: 'region' | 'subRegion' | 'populationRange') {
    const selectedValue = getSelectValue(event);
    this.filterActions[filterType](selectedValue);
    if (filterType === 'region') {
      this.filters.region = selectedValue;
      this.filters.subRegion = '';
      this.updateSubRegions();
    }
  }

  updateSubRegions() {
    const selectedRegion = this.filters.region;

    if (selectedRegion) {
      this.filterDataService.getRegionsAndSubregions(selectedRegion).subscribe(data => {
        this.filterOptions[1].options = data.subregions;
        this.filterOptions[1].disabled = data.subregions.length === 0;
      });
    } else {
      this.filterOptions[1].options = [];
      this.filterOptions[1].disabled = true;  
    }
  }

  toggleFilters() {
    this.showFilters = showOptionsVisibility(this.showFilters);
  }

  private filterActions: { [key: string]: (value: string) => void } = {
    region: (value) => this.filterService.setRegion(value),
    subRegion: (value) => this.filterService.setSubRegion(value),
    populationRange: (value) => this.filterService.setPopulationRange(value)
  };

}
