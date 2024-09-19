import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from 'src/app/models/countries/countries.module';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm$ = new BehaviorSubject<string>('');

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
  }
}
