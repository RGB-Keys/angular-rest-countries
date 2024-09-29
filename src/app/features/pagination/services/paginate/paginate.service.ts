import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from 'src/app/features/countries/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class PaginateService {
  private currentPage$ = new BehaviorSubject<number>(1);
  private pageSize$ = new BehaviorSubject<number>(12);
  
  getCurrentPage(): Observable<number> {
    return this.currentPage$.asObservable();
  }

  setCurrentPage(page: number): void {
    this.currentPage$.next(page);
  }

  getPageSize(): Observable<number> {
    return this.pageSize$.asObservable();
  }

  setPageSize(pageSize: number): void {
    this.pageSize$.next(pageSize);
  }

  resetPage(): void {
    this.setCurrentPage(1);
  }

  getPaginateCountries(countries: Country[], page: number, pageSize: number): Country[] {
    const startIndex = (page - 1) * pageSize;
    return countries.slice(startIndex, startIndex + pageSize);
  }
}
