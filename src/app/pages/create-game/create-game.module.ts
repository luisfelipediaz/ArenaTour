import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateGamePage } from './create-game.page';
import { TeamSelectorComponent } from './team-selector/team-selector.component';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CreateGamePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateGamePage, TeamSelectorComponent],
  entryComponents: [TeamSelectorComponent]
})
export class CreateGamePageModule { }
