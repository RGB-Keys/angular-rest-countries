import { NgModule } from '@angular/core';
import { SortComponent } from './components/sort.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SortComponent],
  imports: [CommonModule],
  exports: [SortComponent]
})
export class SortModule { }
