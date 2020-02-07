import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { IGame } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { ParamsService } from 'src/app/params.service';

@Component({
  selector: 'app-game-scores',
  templateUrl: './game-scores.page.html',
  styleUrls: ['./game-scores.page.scss'],
})
export class GameScoresPage implements OnInit {
  games$: Observable<IGame[]>;

  constructor(
    private fs: AngularFirestore,
    private navParams: ParamsService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.games$ = this.fs.collection<IGame>(`games`).valueChanges();
  }

  goToGame(game: IGame) {
    this.navParams.push('game', game);
    this.navController.navigateForward('game-score-rate');
  }

  goToNewGame() {
    this.navController.navigateForward('create-game');
  }
}
