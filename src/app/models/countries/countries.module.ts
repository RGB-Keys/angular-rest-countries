import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class CountriesModule { }
