import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexComponent } from './flex/flex.component';

const routes: Routes = [
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule)
  },
  {
    path: 'discord',
    loadChildren: () => import('./discord/discord.module').then(m => m.DiscordModule)
  },
  {
    path: 'netflix',
    loadChildren: () => import('./netflix/netflix.module').then(m => m.NetflixModule)
  },
  { path: 'flex', component: FlexComponent },
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
