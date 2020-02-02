import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GameScoreRatePage } from './game-score-rate.page';
import { GameScoreComponent } from './game-score/game-score.component';
import { ButtonsComponent } from './buttons/buttons.component';

const routes: Routes = [
  {
    path: '',
    component: GameScoreRatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GameScoreRatePage,
    GameScoreComponent,
    ButtonsComponent
  ]
})
export class GameScoreRatePageModule { }
