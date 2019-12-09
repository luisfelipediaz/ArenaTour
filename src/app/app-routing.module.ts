import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
      { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
      { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
      { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
      { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
      { path: 'game-scores', loadChildren: './game-scores/game-scores.module#GameScoresPageModule' },
      { path: 'tienda', loadChildren: './pages/tienda/tienda.module#TiendaPageModule' },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home-results'
      }
    ]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
