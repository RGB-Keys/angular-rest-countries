import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    FormsModule],
  exports: [SearchBoxComponent]
})
export class SearchBoxModule { }
