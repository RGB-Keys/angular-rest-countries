import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private region$ = new BehaviorSubject<string>('');
  private subRegion$ = new BehaviorSubject<string>('');
  private populationRange$ = new BehaviorSubject<string>('');

  setRegion(region: string) {
    this.region$.next(region);
  }

  getRegion(): Observable<string> {
    return this.region$.asObservable();
  }

  setSubRegion(subRegion: string) {
    this.subRegion$.next(subRegion);
  }

  getSubRegion(): Observable<string> {
    return this.subRegion$.asObservable();
  }

  setPopulationRange(range: string) {
    this.populationRange$.next(range);
  }

  getPopulationRange(): Observable<string> {
    return this.populationRange$.asObservable();
  }
}
