import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { redirectLoggedInTo, customClaims, AngularFireAuthGuard, hasCustomClaim } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home-results']);
const adminOnly = () => hasCustomClaim('admin');
const adminOrRefereeOnly = () => pipe(customClaims, map(claims => claims.admin || claims.role === 'referee'));

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
      },
      {
        path: 'home-results',
        loadChildren: () => import('./pages/home-results/home-results.module').then(m => m.HomeResultsPageModule)
      },
      {
        path: 'game-scores',
        loadChildren: () => import('./pages/game-scores/game-scores.module').then(m => m.GameScoresPageModule)
      },
      {
        path: 'tienda',
        loadChildren: () => import('./pages/tienda/tienda.module').then(m => m.TiendaPageModule)
      },
      {
        path: 'game-score-rate',
        loadChildren: () => import('./pages/game-score-rate/game-score-rate.module').then(m => m.GameScoreRatePageModule)
      },
      {
        path: 'create-game',
        loadChildren: () => import('./pages/create-game/create-game.module').then(m => m.CreateGamePageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: adminOrRefereeOnly }
      },
      {
        path: 'profile-users',
        loadChildren: () => import('./pages/profile-users/profile-users.module').then(m => m.ProfileUsersPageModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: adminOnly }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home-results'
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
