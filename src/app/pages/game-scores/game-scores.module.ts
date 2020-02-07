import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GameScoresPage } from './game-scores.page';
import { GameScoreComponent } from './game-score/game-score.component';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  {
    path: '',
    component: GameScoresPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GameScoresPage,
    GameScoreComponent
  ]
})
export class GameScoresPageModule { }
