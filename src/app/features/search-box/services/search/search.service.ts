import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginateService } from 'src/app/features/pagination/services/paginate/paginate.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm$ = new BehaviorSubject<string>('');

  constructor(private paginateService: PaginateService) { }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
    this.paginateService.resetPage();
  }
}
