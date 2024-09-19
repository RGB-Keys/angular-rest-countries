import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountriesDetailsComponent } from './components/countries-details/countries-details.component';

const routes: Routes = [
  {path: '', component: CountriesListComponent},
  { path: 'country/:countryName', component: CountriesDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
