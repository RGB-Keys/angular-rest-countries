import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from 'src/app/models/countries/countries.module';

@Injectable({
  providedIn: 'root'
})
export class PaginateService {
  private page$ = new BehaviorSubject<number>(1);
  private pageSize$ = new BehaviorSubject<number>(12);
  
  getPage(): Observable<number> {
    return this.page$.asObservable();
  }

  setPage(page: number): void {
    this.page$.next(page);
  }

  getPageSize(): Observable<number> {
    return this.pageSize$.asObservable();
  }

  setPageSize(pageSize: number): void {
    this.pageSize$.next(pageSize);
  }
}
