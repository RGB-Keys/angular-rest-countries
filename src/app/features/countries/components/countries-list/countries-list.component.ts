import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginateService } from 'src/app/features/pagination/services/paginate/paginate.service';
import { Country } from '../../models/country.model';
import { CountriesListService } from '../../services/countries-list/countries-list.service';


@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent
{
  countries$: Observable<Country[]>;
  totalCountries$: Observable<number>;
  currentPage$: Observable<number>;
  pageSize$: Observable<number>;


  constructor(
    private countriesListService: CountriesListService,
    private paginateService: PaginateService,
    private router: Router
  ){ 
    this.countries$ = this.countriesListService.getPaginatedAndFilteredCountries();
    this.totalCountries$ = this.countriesListService.getTotalFilteredCountries();
    this.currentPage$ = this.paginateService.getCurrentPage();
    this.pageSize$ = this.paginateService.getPageSize();
  }


  onPageChange(page: number): void {
    this.paginateService.setCurrentPage(page);
  }

   goToCountriesDetails(country: Country): void {
    this.router.navigate(['/country', country.name.common]);
  }

}