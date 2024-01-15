import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownFilterComponent } from './drop-down-filter/drop-down-filter.component';
import { StoreModule } from '@ngrx/store';
import { wordReducer } from './state/word.reducer';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DropDownFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    StoreModule.forFeature('words', wordReducer),
    RouterModule.forChild([
      { path: '', component: DropDownFilterComponent },
    ]),
  ]
})
export class FilterModule { }
