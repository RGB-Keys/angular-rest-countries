import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CountryDataService } from 'src/app/features/countries/services/country-data/country-data.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-countries-details',
  templateUrl: './countries-details.component.html',
  styleUrls: ['./countries-details.component.css']
})
export class CountriesDetailsComponent implements OnInit{
  country$: Observable<Country | undefined> = of(undefined);

  constructor(
    private route: ActivatedRoute,
    private countryDataService: CountryDataService,
    private locate:Location
  ) {
  }

  ngOnInit(): void {
    this.loadCountryDetails();
  }

  loadCountryDetails():void {
    this.country$ = this.route.params.pipe(
      switchMap(params => {
        return this.countryDataService.getCountryByName(params['countryName']);
      })
    );
  }
  
  goBack(): void {
    this.locate.back();
  }

}