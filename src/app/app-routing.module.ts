import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule)
  },
  {
    path: '**',
    redirectTo: 'filter'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
