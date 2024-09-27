import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesListComponent } from './features/countries/components/countries-list/countries-list.component';
import { CountriesDetailsComponent } from './features/countries/components/countries-details/countries-details.component';

const routes: Routes = [
  { path: '', component: CountriesListComponent },
  { path: 'country/:countryName', component: CountriesDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }